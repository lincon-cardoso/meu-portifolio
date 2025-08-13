import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
