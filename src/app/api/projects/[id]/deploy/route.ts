/**
 * API ROUTES PARA FUNCIONALIDADES ESPECIAIS DE PROJETOS
 * POST /api/projects/[id]/deploy - Iniciar deploy de projeto
 * POST /api/projects/[id]/toggle-featured - Alternar status de destaque
 * GET /api/projects/[id]/deployments - Listar deployments do projeto
 */

import { NextRequest, NextResponse } from "next/server";
import { ProjectService, DeploymentService } from "@/lib/database-utils";

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * POST /api/projects/[id]/deploy
 * Iniciar deploy manual de um projeto
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

    // Verificar se não há deploy ativo
    const deployments = await DeploymentService.getProjectDeployments(id, 1);
    const hasActiveDeployment = deployments.some((d) =>
      ["PENDING", "IN_PROGRESS"].includes(d.status)
    );

    if (hasActiveDeployment) {
      return NextResponse.json(
        {
          success: false,
          error: "Já existe um deploy ativo para este projeto",
        },
        { status: 409 }
      );
    }

    // Criar novo deployment
    const deployment = await DeploymentService.createDeployment({
      projectId: id,
      triggerBy: "manual", // Assumindo deploy manual por enquanto
      commitHash: undefined, // TODO: Integrar com GitHub API
      commitMessage: "Deploy manual iniciado",
    });

    // Atualizar status do projeto
    await ProjectService.updateProjectStatus(id, "BUILDING");

    return NextResponse.json({
      success: true,
      data: deployment,
      message: "Deploy iniciado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar deploy:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
