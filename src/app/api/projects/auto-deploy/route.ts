/**
 * API ROUTE PARA DEPLOY AUTOMÁTICO SIMPLIFICADO
 * POST /api/projects/auto-deploy - Criar projeto com deploy automático
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deployAutomationService } from "@/lib/deploy-automation-service";

// Schema para auto-deploy
const AutoDeploySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().optional(),
  githubUrl: z.string().url("URL do GitHub inválida"),
  repositoryBranch: z.string().default("main"),
  buildCommand: z.string().default("npm run build"),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  previewImage: z.string().url().optional(),
  customSubdomain: z.string().optional(),
});

/**
 * POST /api/projects/auto-deploy
 * Criar projeto com deploy automático simplificado
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("🚀 Iniciando auto-deploy:", body.name);

    // Validar dados
    const validationResult = AutoDeploySchema.safeParse(body);
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

    // Usar o serviço de automação simplificado
    const result = await deployAutomationService.autoDeployProject({
      name: projectData.name,
      description: projectData.description || "",
      githubUrl: projectData.githubUrl,
      repositoryBranch: projectData.repositoryBranch,
      buildCommand: projectData.buildCommand,
      techStack: projectData.techStack,
      featured: projectData.featured,
      previewImage: projectData.previewImage,
      customSubdomain: projectData.customSubdomain,
    });

    if (result.success) {
      console.log("🎉 Auto-deploy concluído com sucesso!");
      return NextResponse.json({
        success: true,
        data: {
          project: result.project,
          deployment: { id: result.deploymentId },
          subdomain: result.subdomain,
          urls: {
            final: result.fullUrl,
          },
        },
        message: result.message,
      });
    } else {
      console.log("⚠️ Auto-deploy falhou com erros");
      return NextResponse.json(
        {
          success: false,
          data: {
            project: result.project,
            subdomain: result.subdomain,
            errors: result.errors,
          },
          error: "Deploy falhou",
          message: result.message,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("❌ Erro crítico no auto-deploy:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        message: errorMessage,
        details: "Falha crítica no processo de auto-deploy",
      },
      { status: 500 }
    );
  }
}
