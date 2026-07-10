import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_ADDRESS = "Devopsia <suporte@dermasys.com.br>";
const TO_ADDRESS = "contato@devopsia.com.br";

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
