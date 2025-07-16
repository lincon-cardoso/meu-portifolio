import { Resend } from "resend";
import { NextResponse } from "next/server";

// Instancia o Resend puxando a chave do arquivo .env
const resend = new Resend(process.env.RESEND_API_KEY);

const toEmail = "contato@devlincon.com.br"; // Seu e-mail de destino

export async function POST(request: Request) {
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
