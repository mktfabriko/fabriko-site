import { NextRequest, NextResponse } from "next/server";
import { appendToSheet, sendEmail, NOTIFY_EMAILS, CATALOGO_DOWNLOAD_URL } from "@/lib/leads";
import { leadNotifyHtml, catalogoHtml } from "@/lib/emails";

// Lead do formulário de catálogo:
//  1) grava na planilha (aba "Catálogo")
//  2) envia o catálogo (botão de download) para o e-mail do lead
//  3) avisa o(s) responsável(is) da Fabriko que captamos um lead
export async function POST(req: NextRequest) {
  try {
    const { nome, email, whatsapp } = await req.json();
    if (!nome || !email || !whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    const lead = { nome, email, whatsapp };
    const results = await Promise.allSettled([
      appendToSheet("Catálogo", lead),
      sendEmail({
        to: email,
        subject: "Seu catálogo Fabriko",
        html: catalogoHtml(nome, CATALOGO_DOWNLOAD_URL),
      }),
      NOTIFY_EMAILS.length > 0
        ? sendEmail({
            to: NOTIFY_EMAILS,
            subject: `🔔 Novo lead (Catálogo): ${nome}`,
            html: leadNotifyHtml("Download do Catálogo", lead),
            replyTo: email,
          })
        : Promise.resolve(false),
    ]);

    // Sucesso se o lead foi registrado em pelo menos um canal.
    const ok = results.some((r) => r.status === "fulfilled" && r.value === true);
    if (!ok) {
      console.error("[catalogo] nenhum canal registrou o lead", results);
      return NextResponse.json({ error: "Não foi possível registrar o lead" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[catalogo] erro:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
