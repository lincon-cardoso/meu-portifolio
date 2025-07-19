/**
 * API ROUTES PARA GERENCIAMENTO DE PROJETOS
 * GET /api/projects - Listar projetos
 * POST /api/projects - Criar novo projeto
 */

import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/database-utils";
import { z } from "zod";

// Schema de validação para criação de projeto
const CreateProjectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição muito longa"),
  githubUrl: z.string().url("URL do GitHub inválida"),
  subdomain: z
    .string()
    .min(3, "Subdomínio deve ter pelo menos 3 caracteres")
    .max(30, "Subdomínio muito longo")
    .regex(
      /^[a-z0-9-]+$/,
      "Subdomínio só pode conter letras minúsculas, números e hífens"
    ),
  repositoryBranch: z.string().min(1, "Branch é obrigatória").default("main"),
  buildCommand: z
    .string()
    .min(1, "Comando de build é obrigatório")
    .default("npm run build"),
  techStack: z
    .array(z.string())
    .min(1, "Pelo menos uma tecnologia é obrigatória"),
  featured: z.boolean().default(false),
  environmentVars: z.record(z.string(), z.string()).optional(),
  previewImage: z.string().url().optional().or(z.literal("")),
});

/**
 * GET /api/projects
 * Listar todos os projetos com filtros opcionais
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    let projects;

    // Aplicar filtros conforme parâmetros
    if (featured === "true") {
      projects = await ProjectService.getFeaturedProjects();
    } else {
      projects = await ProjectService.getAllProjects();
    }

    // Filtrar por status se especificado
    if (status) {
      projects = projects.filter((project) => project.status === status);
    }

    // Limitar resultados se especificado
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        projects = projects.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar projetos:", error);

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
 * POST /api/projects
 * Criar novo projeto
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados de entrada
    const validationResult = CreateProjectSchema.safeParse(body);

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

    const projectData = validationResult.data;

    // Criar o projeto
    const newProject = await ProjectService.createProject({
      name: projectData.name,
      description: projectData.description,
      githubUrl: projectData.githubUrl,
      subdomain: projectData.subdomain,
      repositoryBranch: projectData.repositoryBranch,
      buildCommand: projectData.buildCommand,
      techStack: projectData.techStack,
      featured: projectData.featured,
      environmentVars: projectData.environmentVars,
      previewImage: projectData.previewImage,
    });

    return NextResponse.json(
      {
        success: true,
        data: newProject,
        message: "Projeto criado com sucesso",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Erro ao criar projeto:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
