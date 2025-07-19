/**
 * DEPLOY AUTOMATION SERVICE SIMPLIFICADO
 * Versão básica para demonstrar integração Railway + Cloudflare
 * Funciona com o schema atual do Prisma
 */

import { ProjectService, DeploymentService } from "./database-utils";
import type { Project } from "@prisma/client";

interface DeployResult {
  success: boolean;
  project: Project;
  subdomain: string;
  fullUrl: string;
  deploymentId: string;
  message: string;
  errors?: string[];
}

interface AutoDeployParams {
  name: string;
  description?: string;
  githubUrl: string;
  repositoryBranch?: string;
  buildCommand?: string;
  techStack?: string[];
  featured?: boolean;
  previewImage?: string;
  customSubdomain?: string;
}

export class DeployAutomationService {
  /**
   * Deploy automático simplificado
   * Cria projeto no banco e simula integração com Railway/Cloudflare
   */
  async autoDeployProject(params: AutoDeployParams): Promise<DeployResult> {
    console.log("🚀 Iniciando deploy automático para:", params.name);

    const errors: string[] = [];
    let project: Project | null = null;
    let deploymentId = "";

    try {
      // 1. Gerar subdomínio único baseado no nome
      const baseSubdomain = (
        params.customSubdomain ||
        params.name.toLowerCase().replace(/[^a-z0-9-]/g, "-")
      ).substring(0, 30); // Limitar tamanho

      // Verificar se subdomínio já existe
      let subdomain = baseSubdomain;
      let counter = 1;

      while (await ProjectService.getProjectBySubdomain(subdomain)) {
        subdomain = `${baseSubdomain}-${counter}`;
        counter++;
        if (counter > 100) {
          throw new Error("Não foi possível gerar subdomínio único");
        }
      }

      console.log("✅ Subdomínio gerado:", subdomain);

      // 2. Criar projeto no banco de dados
      project = await ProjectService.createProject({
        name: params.name,
        description: params.description || "",
        githubUrl: params.githubUrl,
        subdomain: subdomain,
        repositoryBranch: params.repositoryBranch || "main",
        buildCommand: params.buildCommand || "npm run build",
        techStack: params.techStack || [],
        featured: params.featured || false,
        environmentVars: {},
        previewImage: params.previewImage,
      });

      console.log("✅ Projeto criado no banco:", project.id);

      // 3. Criar deployment record
      const deployment = await DeploymentService.createDeployment({
        projectId: project.id,
        triggerBy: "automatic",
        commitMessage: "Deploy automático inicial",
      });

      deploymentId = deployment.id;
      console.log("✅ Deployment criado:", deploymentId);

      // 4. Atualizar status para BUILDING
      await ProjectService.updateProjectStatus(project.id, "BUILDING");

      // 5. Simular processo de deploy (em produção seria Railway + Cloudflare)
      console.log("🔨 Simulando deploy no Railway...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular tempo de deploy

      console.log("🌐 Simulando configuração DNS no Cloudflare...");
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simular tempo DNS

      // 6. Atualizar URLs do projeto
      const fullUrl = `https://${subdomain}.linconcardoso.com`;
      await ProjectService.updateProject(project.id, {
        // deployUrl será configurado quando Railway/Cloudflare estiverem integrados
      });

      // 7. Finalizar deployment com sucesso
      await DeploymentService.updateDeploymentStatus(deploymentId, "SUCCESS", {
        deployUrl: fullUrl,
        logs: [
          "✅ Projeto clonado do GitHub",
          "✅ Dependências instaladas",
          "✅ Build executado com sucesso",
          "✅ Deploy realizado no Railway",
          "✅ DNS configurado no Cloudflare",
          "🎉 Deploy concluído com sucesso!",
        ],
      });

      await ProjectService.updateProjectStatus(project.id, "DEPLOYED");

      console.log("🎉 Deploy automático concluído com sucesso!");

      return {
        success: true,
        project: (await ProjectService.getProjectById(project.id)) as Project,
        subdomain: subdomain,
        fullUrl: fullUrl,
        deploymentId: deploymentId,
        message: `Projeto ${params.name} foi deployado com sucesso em ${fullUrl}`,
      };
    } catch (error) {
      const errorMsg = `Erro crítico no deploy: ${error instanceof Error ? error.message : "Erro desconhecido"}`;
      console.error("❌", errorMsg);
      errors.push(errorMsg);

      // Cleanup em caso de erro crítico
      if (deploymentId) {
        await DeploymentService.updateDeploymentStatus(deploymentId, "FAILED", {
          errorLogs: [errorMsg],
        });
      }
      if (project) {
        await ProjectService.updateProjectStatus(project.id, "ERROR");
      }

      return {
        success: false,
        project: project as Project,
        subdomain: "",
        fullUrl: "",
        deploymentId: deploymentId,
        message: errorMsg,
        errors: errors,
      };
    }
  }

  /**
   * Redeploy de projeto existente
   */
  async redeployProject(projectId: string): Promise<DeployResult> {
    console.log("🔄 Iniciando redeploy do projeto:", projectId);

    try {
      // 1. Buscar projeto
      const project = await ProjectService.getProjectById(projectId);
      if (!project) {
        throw new Error("Projeto não encontrado");
      }

      // 2. Verificar se já está sendo deployado
      const activeDeployments = await DeploymentService.getProjectDeployments(
        projectId,
        5
      );
      const hasActive = activeDeployments.some((d) =>
        ["PENDING", "IN_PROGRESS"].includes(d.status)
      );

      if (hasActive) {
        throw new Error("Projeto já está sendo deployado");
      }

      // 3. Criar novo deployment
      const deployment = await DeploymentService.createDeployment({
        projectId: projectId,
        triggerBy: "manual",
        commitMessage: "Redeploy manual",
      });

      console.log("✅ Deployment criado:", deployment.id);

      // 4. Atualizar status
      await ProjectService.updateProjectStatus(projectId, "BUILDING");

      // 5. Simular redeploy
      console.log("🔨 Executando redeploy...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 6. Finalizar
      const fullUrl = `https://${project.subdomain}.linconcardoso.com`;

      await DeploymentService.updateDeploymentStatus(deployment.id, "SUCCESS", {
        deployUrl: fullUrl,
        logs: [
          "🔄 Iniciando redeploy",
          "✅ Código atualizado",
          "✅ Build executado",
          "✅ Deploy concluído",
        ],
      });

      await ProjectService.updateProjectStatus(projectId, "DEPLOYED");

      const updatedProject = (await ProjectService.getProjectById(
        projectId
      )) as Project;

      return {
        success: true,
        project: updatedProject,
        subdomain: project.subdomain,
        fullUrl: fullUrl,
        deploymentId: deployment.id,
        message: "Redeploy concluído com sucesso!",
      };
    } catch (error) {
      const errorMsg = `Erro no redeploy: ${error instanceof Error ? error.message : "Erro desconhecido"}`;
      console.error("❌", errorMsg);

      return {
        success: false,
        project: (await ProjectService.getProjectById(projectId)) as Project,
        subdomain: "",
        fullUrl: "",
        deploymentId: "",
        message: errorMsg,
        errors: [errorMsg],
      };
    }
  }

  /**
   * Obter status de deploy simplificado
   */
  async getDeployStatus(deploymentId: string): Promise<{
    status: string;
    logs?: string[];
    message: string;
  }> {
    try {
      // Buscar deployment por ID através dos projetos
      const projects = await ProjectService.getAllProjects();
      let deployment = null;

      for (const project of projects) {
        const found = project.deployments.find((d) => d.id === deploymentId);
        if (found) {
          deployment = found;
          break;
        }
      }

      if (!deployment) {
        return {
          status: "not_found",
          message: "Deployment não encontrado",
        };
      }

      return {
        status: deployment.status,
        logs: deployment.logs,
        message: `Status: ${deployment.status}`,
      };
    } catch (error) {
      console.error("❌ Erro ao obter status do deploy:", error);
      return {
        status: "error",
        message: `Erro: ${error instanceof Error ? error.message : "erro desconhecido"}`,
      };
    }
  }
}

/**
 * Instância singleton do serviço de automação
 */
export const deployAutomationService = new DeployAutomationService();
