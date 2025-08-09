import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const showAll = url.searchParams.get("all") === "true";

    // Buscar projetos com base no parâmetro
    const projetos = await prisma.projeto.findMany({
      where: showAll ? {} : { destaque: true },
      orderBy: {
        criadoEm: "asc",
      },
    });

    // Se não houver projetos, retorna 200 com array vazio
    if (!projetos || projetos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(projetos);
  } catch (error: unknown) {
    // Só retorna 403 se for erro de permissão
    if (
      typeof error === "object" &&
      error !== null &&
      ("code" in error || "status" in error)
    ) {
      // @ts-expect-error: code e status podem existir em erros do Prisma ou customizados
      if (error.code === "P2001" || error.status === 403) {
        return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
      }
    }
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
