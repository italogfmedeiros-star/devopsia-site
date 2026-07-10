import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_ADDRESS = "Devopsia <suporte@dermasys.com.br>";
const TO_ADDRESS = "contato@devopsia.com.br";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(name: string, email: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `
  <div style="background-color:#0b0d0f;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background-color:#13161a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(180deg,#41e59b,#25b374);padding:20px 28px;">
        <span style="font-size:16px;font-weight:600;color:#04140d;">Devopsia</span>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 4px;font-size:18px;color:#f5f7f6;">Novo contato pelo site</h1>
        <p style="margin:0 0 24px;font-size:13px;color:#9aa5a1;">Recebido pelo formulário de contato em devopsia.com.br</p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#9aa5a1;width:80px;">Nome</td>
            <td style="padding:8px 0;font-size:14px;color:#f5f7f6;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#9aa5a1;">E-mail</td>
            <td style="padding:8px 0;font-size:14px;color:#f5f7f6;">
              <a href="mailto:${safeEmail}" style="color:#41e59b;text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>
        </table>

        <div style="background-color:#0b0d0f;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 18px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#9aa5a1;">Mensagem</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#e6ebe9;">${safeMessage}</p>
        </div>

        <p style="margin:24px 0 0;font-size:12px;color:#6c7570;">Responda direto este e-mail para falar com ${safeName}.</p>
      </div>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Preencha todos os campos." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Informe um e-mail válido." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY não configurada.");
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar. Tente novamente mais tarde." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);
  const { name, email, message } = body;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: email,
    subject: `Novo contato de ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    html: buildEmailHtml(name, email, message),
  });

  if (error) {
    console.error("Erro ao enviar e-mail via Resend:", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
