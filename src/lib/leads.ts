// Utilitários de captação de leads — envio de e-mail (Resend) e gravação na planilha.
// Configurar em .env.local (e nas variáveis de ambiente da Vercel):
//   RESEND_API_KEY=re_xxx
//   RESEND_FROM="Fabriko Indústria de Móveis <contato@fabrikoindustria.com.br>"
//   LEAD_NOTIFY_EMAILS=projetos@fabriko.ind.br,mktfabriko@gmail.com
//   CATALOGO_URL=https://www.fabrikoindustria.com.br/catalogo/apresentacao-fabriko-2026.pdf
//   SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec   (opcional — planilha)

export type LeadData = { nome: string; email: string; whatsapp: string };

export const NOTIFY_EMAILS = (process.env.LEAD_NOTIFY_EMAILS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const CATALOGO_DOWNLOAD_URL = process.env.CATALOGO_URL || "";

const FROM =
  process.env.RESEND_FROM || "Fabriko Indústria de Móveis <onboarding@resend.dev>";

// Envia um e-mail via API do Resend. Retorna true se enviou com sucesso.
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[leads] RESEND_API_KEY ausente — e-mail não enviado");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[leads] Resend falhou:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[leads] Resend erro:", err);
    return false;
  }
}

// Adiciona o lead a uma aba da planilha via Web App do Google Apps Script.
// Retorna true se gravou. Se SHEETS_WEBAPP_URL não estiver configurado, pula.
export async function appendToSheet(tab: string, data: LeadData): Promise<boolean> {
  const url = process.env.SHEETS_WEBAPP_URL;
  if (!url) {
    console.warn("[leads] SHEETS_WEBAPP_URL ausente — gravação na planilha ignorada");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tab,
        timestamp: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
      }),
    });
    if (!res.ok) {
      console.error("[leads] Sheets falhou:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[leads] Sheets erro:", err);
    return false;
  }
}
