import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Buscar todos os projetos sem autenticação
    const projetos = await prisma.projeto.findMany({
      orderBy: {
        criadoEm: "asc",
      },
    });

    if (!projetos || projetos.length === 0) {
      console.warn("Nenhum projeto encontrado.");
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
