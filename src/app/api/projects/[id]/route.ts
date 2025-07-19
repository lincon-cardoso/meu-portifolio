/**
 * API ROUTES PARA PROJETO ESPECÍFICO
 * GET /api/projects/[id] - Buscar projeto por ID
 * PUT /api/projects/[id] - Atualizar projeto
 * DELETE /api/projects/[id] - Deletar projeto
 */

import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/database-utils";
import { z } from "zod";

// Schema de validação para atualização de projeto
const UpdateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .optional(),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição muito longa")
    .optional(),
  githubUrl: z.string().url("URL do GitHub inválida").optional(),
  subdomain: z
    .string()
    .min(3, "Subdomínio deve ter pelo menos 3 caracteres")
    .max(30, "Subdomínio muito longo")
    .regex(
      /^[a-z0-9-]+$/,
      "Subdomínio só pode conter letras minúsculas, números e hífens"
    )
    .optional(),
  repositoryBranch: z.string().min(1, "Branch é obrigatória").optional(),
  buildCommand: z.string().min(1, "Comando de build é obrigatório").optional(),
  techStack: z
    .array(z.string())
    .min(1, "Pelo menos uma tecnologia é obrigatória")
    .optional(),
  featured: z.boolean().optional(),
  environmentVars: z.record(z.string(), z.string()).optional(),
  previewImage: z.string().url().optional().or(z.literal("")),
});

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * GET /api/projects/[id]
 * Buscar projeto específico por ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
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

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar projeto:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/[id]
 * Atualizar projeto específico
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const body = await request.json();

    // Validar dados de entrada
    const validationResult = UpdateProjectSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Verificar se o projeto existe
    const existingProject = await ProjectService.getProjectById(id);
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "Projeto não encontrado",
        },
        { status: 404 }
      );
    }

    const updateData = validationResult.data;

    // Atualizar o projeto
    const updatedProject = await ProjectService.updateProject(id, updateData);

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Projeto atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar projeto:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * Deletar projeto específico
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
    const existingProject = await ProjectService.getProjectById(id);
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "Projeto não encontrado",
        },
        { status: 404 }
      );
    }

    // Deletar o projeto
    await ProjectService.deleteProject(id);

    return NextResponse.json({
      success: true,
      message: "Projeto deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar projeto:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
