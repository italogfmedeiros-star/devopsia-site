import { NextResponse } from "next/server";

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

  console.log("Novo contato Devopsia:", {
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
