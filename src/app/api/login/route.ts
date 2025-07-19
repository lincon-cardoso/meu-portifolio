import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const validaEmail = "linkon789@gmail.com";
  const validaSenha = "123456";

  const errors: { [key: string]: string } = {
    message: "E-mail ou  inválido. Verifique e tente novamente.",
  };

  if (email !== validaEmail) {
    return NextResponse.json({ error: errors.message }, { status: 400 });
  }

  if (password !== validaSenha) {
    return NextResponse.json({ error: errors.message }, { status: 400 });
  }

  return NextResponse.json({ redirect: "/dashboard" }, { status: 200 });
}
