import { NextRequest, NextResponse } from "next/server";
import { appendToSheet, sendEmail, NOTIFY_EMAILS } from "@/lib/leads";
import { leadNotifyHtml } from "@/lib/emails";

// Lead do formulário "Seja Parceiro":
//  1) grava na planilha (aba "Parceiros")
//  2) avisa o(s) responsável(is) da Fabriko por e-mail, com o contato do lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, empresa, cidade, estado, segmento, mensagem } = body;
    // aceita "whatsapp" (form da home) ou "telefone" (form completo do Seja Parceiro)
    const whatsapp = body.whatsapp || body.telefone || "";
    if (!nome || !email || !whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    const lead = { nome, email, whatsapp };
    const extra = { empresa, cidade, estado, segmento, mensagem };
    const results = await Promise.allSettled([
      appendToSheet("Parceiros", lead),
      NOTIFY_EMAILS.length > 0
        ? sendEmail({
            to: NOTIFY_EMAILS,
            subject: `🔔 Novo lead (Seja Parceiro): ${nome}`,
            html: leadNotifyHtml("Seja Parceiro", lead, extra),
            replyTo: email,
          })
        : Promise.resolve(false),
    ]);

    // Sucesso se o lead foi registrado em pelo menos um canal (planilha ou e-mail).
    const ok = results.some((r) => r.status === "fulfilled" && r.value === true);
    if (!ok) {
      console.error("[parceiro] nenhum canal registrou o lead", results);
      return NextResponse.json({ error: "Não foi possível registrar o lead" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[parceiro] erro:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
