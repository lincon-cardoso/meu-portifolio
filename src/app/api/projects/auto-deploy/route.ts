/**
 * API ROUTE PARA DEPLOY AUTOMÁTICO
 * POST /api/projects/auto-deploy - Criar projeto com deploy automático
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ProjectService, DeploymentService } from "@/lib/database-utils";
import { cloudflareService } from "@/lib/cloudflare-service";
import { railwayService } from "@/lib/railway-service";

// Schema para auto-deploy
const AutoDeploySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().optional(),
  githubUrl: z.string().url("URL do GitHub inválida"),
  repositoryBranch: z.string().default("main"),
  buildCommand: z.string().default("npm run build"),
  startCommand: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  environmentVars: z.record(z.string(), z.string()).default({}),
  featured: z.boolean().default(false),
  previewImage: z.string().url().optional(),
  customSubdomain: z.string().optional(),
  autoCreateSubdomain: z.boolean().default(true),
  enableRailwayDeploy: z.boolean().default(true),
});

/**
 * POST /api/projects/auto-deploy
 * Criar projeto com deploy automático completo
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
    const deploymentLog: string[] = [];
    const errorLog: string[] = [];
    let finalStatus: "SUCCESS" | "FAILED" = "SUCCESS";

    // 1. Gerar subdomínio único
    let subdomain =
      projectData.customSubdomain ||
      projectData.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    if (projectData.autoCreateSubdomain) {
      try {
        subdomain = await cloudflareService.generateUniqueSubdomain(subdomain);
        deploymentLog.push(`✅ Subdomínio gerado: ${subdomain}`);
        console.log("✅ Subdomínio gerado:", subdomain);
      } catch (error) {
        const errorMsg = `Erro ao gerar subdomínio: ${error instanceof Error ? error.message : "Erro desconhecido"}`;
        errorLog.push(errorMsg);
        console.error("❌", errorMsg);
        finalStatus = "FAILED";
      }
    }

    // 2. Criar projeto no banco de dados
    const project = await ProjectService.createProject({
      name: projectData.name,
      description: projectData.description || "",
      githubUrl: projectData.githubUrl,
      subdomain: subdomain,
      repositoryBranch: projectData.repositoryBranch,
      buildCommand: projectData.buildCommand,
      techStack: projectData.techStack,
      featured: projectData.featured,
      environmentVars: projectData.environmentVars,
      previewImage: projectData.previewImage,
    });

    deploymentLog.push(`✅ Projeto criado no banco: ${project.id}`);
    console.log("✅ Projeto criado no banco:", project.id);

    // 3. Criar registro de deployment
    const deployment = await DeploymentService.createDeployment({
      projectId: project.id,
      triggerBy: "auto-deploy",
      commitMessage: "Deploy automático inicial",
    });

    deploymentLog.push(`✅ Deployment criado: ${deployment.id}`);

    // 4. Atualizar status inicial
    await ProjectService.updateProjectStatus(project.id, "BUILDING");

    // 5. Configurar Railway (se habilitado)
    let railwayDeployUrl = "";
    if (projectData.enableRailwayDeploy) {
      try {
        const fullDomain = `${subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`;

        const railwayProject = await railwayService.createProject({
          name: projectData.name,
          description: projectData.description,
          githubUrl: projectData.githubUrl,
          branch: projectData.repositoryBranch,
          buildCommand: projectData.buildCommand,
          startCommand: projectData.startCommand,
          environmentVars: projectData.environmentVars,
          customDomain: fullDomain,
        });

        railwayDeployUrl =
          railwayProject.deployments?.[0]?.url || `${subdomain}.up.railway.app`;
        deploymentLog.push(
          `✅ Projeto criado no Railway: ${railwayProject.id}`
        );
        console.log("✅ Projeto criado no Railway:", railwayProject.id);

        // Atualizar projeto (deployUrl será configurado via migration futura)
        // await ProjectService.updateProject(project.id, {
        //   deployUrl: railwayDeployUrl
        // });
      } catch (railwayError) {
        const errorMsg = `Erro no Railway: ${railwayError instanceof Error ? railwayError.message : "Erro desconhecido"}`;
        errorLog.push(errorMsg);
        console.error("❌", errorMsg);
        finalStatus = "FAILED";
      }
    }

    // 6. Configurar DNS no Cloudflare
    let cloudflareUrl = "";
    if (projectData.autoCreateSubdomain) {
      try {
        const railwayTarget =
          railwayDeployUrl || `${subdomain}-temp.railway.app`;

        await cloudflareService.setupSubdomain({
          subdomain: subdomain,
          railwayUrl: railwayTarget,
          enableProxy: true,
          sslMode: "flexible",
        });

        cloudflareUrl = `https://${subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`;
        deploymentLog.push(`✅ DNS configurado: ${cloudflareUrl}`);
        console.log("✅ DNS configurado:", cloudflareUrl);

        // Atualizar projeto (deployUrl será configurado via migration futura)
        // await ProjectService.updateProject(project.id, {
        //   deployUrl: cloudflareUrl
        // });
      } catch (cloudflareError) {
        const errorMsg = `Erro no Cloudflare: ${cloudflareError instanceof Error ? cloudflareError.message : "Erro desconhecido"}`;
        errorLog.push(errorMsg);
        console.error("❌", errorMsg);
        finalStatus = "FAILED";
      }
    }

    // 7. Finalizar deployment
    const deploymentStatus = finalStatus === "SUCCESS" ? "SUCCESS" : "FAILED";
    const projectStatus = finalStatus === "SUCCESS" ? "DEPLOYED" : "ERROR";

    await DeploymentService.updateDeploymentStatus(
      deployment.id,
      deploymentStatus,
      {
        logs: deploymentLog,
        errorLogs: errorLog,
        deployUrl: cloudflareUrl || railwayDeployUrl || "",
      }
    );

    await ProjectService.updateProjectStatus(project.id, projectStatus);

    // 8. Buscar projeto atualizado
    const updatedProject = await ProjectService.getProjectById(project.id);

    if (finalStatus === "SUCCESS") {
      console.log("🎉 Auto-deploy concluído com sucesso!");
      return NextResponse.json({
        success: true,
        data: {
          project: updatedProject,
          deployment: deployment,
          subdomain: subdomain,
          urls: {
            cloudflare: cloudflareUrl,
            railway: railwayDeployUrl,
            final: cloudflareUrl || railwayDeployUrl,
          },
          logs: deploymentLog,
        },
        message: `Projeto ${projectData.name} foi deployado com sucesso!`,
      });
    } else {
      console.log("⚠️ Auto-deploy falhou com erros");
      return NextResponse.json(
        {
          success: false,
          data: {
            project: updatedProject,
            deployment: deployment,
            subdomain: subdomain,
            logs: deploymentLog,
            errors: errorLog,
          },
          error: "Deploy falhou",
          message: `Erro no deploy: ${errorLog.join(", ")}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
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
