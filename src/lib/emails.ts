// Templates de e-mail (HTML inline, compatível com clientes de e-mail).
import type { LeadData } from "@/lib/leads";

const onlyDigits = (s: string) => s.replace(/\D/g, "");

const LOGO_URL = "https://www.fabrikoindustria.com.br/email/logo-fabriko.png";

function wrap(inner: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f0f0f0">
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#FAFAF8">
    <div style="background:#1A1917;padding:28px;text-align:center">
      <img src="${LOGO_URL}" alt="Fabriko — Indústria de Móveis" width="200" style="width:200px;max-width:68%;height:auto;display:inline-block;border:0" />
    </div>
    <div style="padding:32px">${inner}</div>
    <div style="padding:20px 32px;border-top:1px solid #E8E6E3;color:#999;font-size:12px">
      <p style="margin:0">📱 (19) 99625-2987 &nbsp;·&nbsp; ✉️ projetos@fabriko.ind.br</p>
      <p style="margin:6px 0 0">Americana — São Paulo · Fabriko Indústria de Móveis</p>
    </div>
  </div>
</body>
</html>`;
}

// Aviso interno para o responsável da Fabriko: novo lead captado.
type LeadExtra = { empresa?: string; cidade?: string; estado?: string; segmento?: string; mensagem?: string };

export function leadNotifyHtml(origem: string, data: LeadData, extra: LeadExtra = {}): string {
  const zap = onlyDigits(data.whatsapp);
  const waLink = zap ? `https://wa.me/${zap.length <= 11 ? "55" + zap : zap}` : "#";

  const rows: [string, string][] = [
    ["Nome", data.nome],
    ["E-mail", `<a href="mailto:${data.email}" style="color:#E67A22;text-decoration:none">${data.email}</a>`],
    ["WhatsApp / Tel.", data.whatsapp],
  ];
  if (extra.empresa) rows.push(["Empresa", extra.empresa]);
  const local = [extra.cidade, extra.estado].filter(Boolean).join(" / ");
  if (local) rows.push(["Cidade / UF", local]);
  if (extra.segmento) rows.push(["Segmento", extra.segmento]);
  if (extra.mensagem) rows.push(["Mensagem", extra.mensagem]);

  const rowsHtml = rows
    .map(([label, value], i) => {
      const border = i < rows.length - 1 ? "border-bottom:1px solid #E8E6E3;" : "";
      return `<tr>
        <td style="padding:14px 18px;${border}color:#999;font-size:12px;width:130px;vertical-align:top">${label}</td>
        <td style="padding:14px 18px;${border}color:#1A1917;font-size:14px">${value}</td>
      </tr>`;
    })
    .join("");

  return wrap(`
    <p style="color:#E67A22;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px">Novo lead pelo site</p>
    <h2 style="color:#1A1917;font-size:22px;margin:0 0 4px">${data.nome}</h2>
    <p style="color:#6B6966;font-size:13px;margin:0 0 24px">Origem: <strong>${origem}</strong></p>

    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #E8E6E3;border-radius:8px;overflow:hidden">
      ${rowsHtml}
    </table>

    <div style="text-align:center;margin:28px 0 4px">
      <a href="${waLink}" style="display:inline-block;background:#E67A22;color:#fff;font-size:13px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:4px">Chamar no WhatsApp</a>
    </div>
    <p style="color:#999;font-size:12px;text-align:center;margin:14px 0 0">Você pode responder este e-mail para falar direto com o lead.</p>
  `);
}

// E-mail para o lead com o botão de download do catálogo.
export function catalogoHtml(nome: string, catalogoUrl: string): string {
  return wrap(`
    <p style="color:#1A1917;font-size:16px;margin:0 0 4px">Olá, <strong>${nome}</strong>! 👋</p>
    <p style="color:#555;line-height:1.6;margin:0 0 24px">
      Obrigado pelo seu interesse na <strong>Fabriko</strong>. Seu catálogo está pronto —
      é só clicar no botão abaixo para baixar.
    </p>

    <div style="text-align:center;margin:8px 0 28px">
      <a href="${catalogoUrl}" style="display:inline-block;background:#E67A22;color:#fff;font-size:14px;font-weight:bold;text-decoration:none;padding:16px 34px;border-radius:4px">Baixar catálogo (PDF)</a>
    </div>

    <p style="color:#555;line-height:1.6;margin:0 0 8px">
      Somos uma fábrica de móveis planejados em Americana-SP, parceira ideal das lojas de móveis.
      Produzimos 100% em MDF, bordas PUR 1mm, via Promob, com prazo de 20 dias úteis.
    </p>
    <p style="color:#555;line-height:1.6;margin:0">
      Ficou com alguma dúvida? Basta responder este e-mail ou chamar no WhatsApp <strong>(19) 99625-2987</strong>.
    </p>
  `);
}
