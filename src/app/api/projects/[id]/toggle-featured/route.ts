/**
 * API ROUTE PARA ALTERNAR STATUS DE DESTAQUE
 * POST /api/projects/[id]/toggle-featured
 */

import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/database-utils";

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * POST /api/projects/[id]/toggle-featured
 * Alternar status de destaque do projeto
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do projeto é obrigatório",
        },
        { status: 400 }
      );
    }

    // Verificar se o projeto existe
    const project = await ProjectService.getProjectById(id);
    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Projeto não encontrado",
        },
        { status: 404 }
      );
    }

    // Alternar status de destaque
    const updatedProject = await ProjectService.updateProject(id, {
      featured: !project.featured,
    });

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: `Projeto ${updatedProject.featured ? "destacado" : "removido dos destaques"}`,
    });
  } catch (error) {
    console.error("❌ Erro ao alternar destaque:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
