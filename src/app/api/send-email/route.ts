import { Resend } from "resend";
import { NextResponse } from "next/server";

const toEmail = "contato@devlincon.com.br"; // Seu e-mail de destino

export async function POST(request: Request) {
  // Verifica se a chave RESEND_API_KEY está definida
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não definida");
    return NextResponse.json(
      { error: "Chave RESEND_API_KEY não definida" },
      { status: 500 }
    );
  }
  // Instancia o Resend usando a chave de API válida
  const resend = new Resend(apiKey);
  try {
    const { nome, email, assunto, mensagem } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Contato Portfólio <contato@devlincon.com.br>", // Este remetente é um padrão do Resend para testes.
      to: [toEmail],
      subject: `Novo Contato: ${assunto}`,
      replyTo: email, // Permite que você clique em "Responder" e o e-mail vá para o usuário.
      html: `
        <h1>Nova mensagem do seu Portfólio</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email enviado com sucesso!", data });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro inesperado." },
      { status: 500 }
    );
  }
}
