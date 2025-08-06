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

    if (!projetos || projetos.length === 0) {
      console.warn(
        showAll
          ? "Nenhum projeto encontrado."
          : "Nenhum projeto destacado encontrado."
      );
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
