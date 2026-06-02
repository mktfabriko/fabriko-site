import { NextRequest, NextResponse } from "next/server";

// ─── Google Sheets ────────────────────────────────────────────────────────────
// Configure em .env.local:
// GOOGLE_SHEETS_ID=sua_planilha_id
// GOOGLE_SERVICE_ACCOUNT_EMAIL=email@projeto.iam.gserviceaccount.com
// GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

async function addToGoogleSheets(data: { nome: string; email: string; whatsapp: string }) {
  try {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Leads!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toLocaleString("pt-BR"), data.nome, data.email, data.whatsapp]],
      },
    });
  } catch (err) {
    console.error("Sheets error:", err);
  }
}

// ─── Email ────────────────────────────────────────────────────────────────────
// Configure em .env.local:
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=seu@gmail.com
// SMTP_PASS=sua_senha_de_app
// EMAIL_FROM=contato@fabriko.ind.br

async function sendEmail(data: { nome: string; email: string; whatsapp: string }) {
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // E-mail para o cliente com apresentação
    await transporter.sendMail({
      from: `"Fabriko Indústria de Móveis" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Apresentação Fabriko — Sua parceria começa aqui",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1A1917;padding:32px;text-align:center">
            <h1 style="color:#E67A22;font-size:28px;margin:0">FABRIKO</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:4px 0 0">INDÚSTRIA DE MÓVEIS PLANEJADOS</p>
          </div>
          <div style="padding:32px;background:#FAFAF8">
            <p style="color:#1A1917;font-size:16px">Olá, <strong>${data.nome}</strong>!</p>
            <p style="color:#555;line-height:1.6">
              Obrigado pelo seu interesse em ser parceiro Fabriko.
              Em breve, nosso time comercial entrará em contato pelo WhatsApp <strong>${data.whatsapp}</strong>
              para apresentar nossas condições exclusivas.
            </p>
            <p style="color:#555;line-height:1.6">
              Somos uma fábrica de móveis planejados em Americana-SP, parceira ideal das lojas de móveis.
              Produzimos 100% em MDF, bordas PUR 1mm, via Promob, com prazo de 20 dias úteis.
            </p>
            <div style="background:#fff;border:1px solid #E8E6E3;border-radius:8px;padding:20px;margin:24px 0">
              <p style="color:#E67A22;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px">Nossos contatos</p>
              <p style="color:#1A1917;margin:4px 0">📱 WhatsApp: (19) 99625-2987</p>
              <p style="color:#1A1917;margin:4px 0">✉️ projetos@fabriko.ind.br</p>
              <p style="color:#1A1917;margin:4px 0">📷 @fabriko.ind</p>
            </div>
            <p style="color:#999;font-size:12px">Americana — São Paulo | Fabriko Indústria de Móveis</p>
          </div>
        </div>
      `,
    });

    // Notificação interna
    await transporter.sendMail({
      from: `"Fabriko Site" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_FROM || process.env.SMTP_USER || "",
      subject: `[LEAD] Novo parceiro: ${data.nome}`,
      html: `<p><b>Nome:</b> ${data.nome}<br><b>Email:</b> ${data.email}<br><b>WhatsApp:</b> ${data.whatsapp}</p>`,
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
// Configure em .env.local:
// ZAPI_INSTANCE_ID=seu_id
// ZAPI_TOKEN=seu_token
// ZAPI_CLIENT_TOKEN=seu_client_token

async function sendWhatsApp(data: { nome: string; whatsapp: string }) {
  try {
    const phone = data.whatsapp.replace(/\D/g, "");
    const message = `Olá ${data.nome}! 👋\n\nSou da *Fabriko Indústria de Móveis*, recebemos seu interesse em ser parceiro!\n\nSomos uma fábrica de móveis planejados em Americana-SP. Produzimos via Promob, com 3 linhas, dezenas de acabamentos e prazo de 20 dias úteis.\n\nVou te enviar nossa apresentação completa. Pode aguardar? 😊`;

    if (process.env.ZAPI_INSTANCE_ID && process.env.ZAPI_TOKEN) {
      await fetch(
        `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Client-Token": process.env.ZAPI_CLIENT_TOKEN || "",
          },
          body: JSON.stringify({ phone, message }),
        }
      );
    }
  } catch (err) {
    console.error("WhatsApp error:", err);
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { nome, email, whatsapp } = data;

    if (!nome || !email || !whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    // Executar em paralelo
    await Promise.allSettled([
      addToGoogleSheets({ nome, email, whatsapp }),
      sendEmail({ nome, email, whatsapp }),
      sendWhatsApp({ nome, whatsapp }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
