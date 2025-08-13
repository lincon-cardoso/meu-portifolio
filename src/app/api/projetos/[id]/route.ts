import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    await prisma.projeto.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(JSON.stringify({ error: "Erro ao apagar projeto" }), {
      status: 500,
    });
  }
}
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  // Garante compatibilidade com params sendo Promise ou objeto direto
  const params =
    "then" in context.params
      ? await (context.params as Promise<{ id: string }>)
      : (context.params as { id: string });
  const id = params.id;
  const data = await req.json();
  console.log("Backend PUT - Dados recebidos:", data);

  try {
    const destaqueBool = String(data.destaque).toLowerCase() === "true";

    const projeto = await prisma.projeto.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        category: data.category,
        tecnologias: data.tecnologias,
        link: data.link,
        linkGithub: data.linkGithub,
        destaque: destaqueBool,
      },
    });
    return NextResponse.json(projeto);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar projeto" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const params =
    "then" in context.params
      ? await (context.params as Promise<{ id: string }>)
      : (context.params as { id: string });
  const id = params.id;
  try {
    const projeto = await prisma.projeto.findUnique({ where: { id } });
    if (!projeto) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(projeto);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar projeto" },
      { status: 500 }
    );
  }
}
