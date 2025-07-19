/**
 * DEPLOY AUTOMATION SERVICE
 * Orquestra o processo completo: Railway Deploy + Cloudflare DNS
 * Integração automática para deploy completo com subdomínio
 */

import { railwayService } from "./railway-service";
import { cloudflareService } from "./cloudflare-service";
import { ProjectService, DeploymentService } from "./database-utils";
import type { Project } from "@prisma/client";

interface DeployProjectParams {
  projectId: string;
  subdomain?: string; // Se não fornecido, será gerado automaticamente
  enableCustomDomain?: boolean; // Padrão: true
  forceRedeploy?: boolean; // Forçar redeploy mesmo se já existir
}

interface DeployResult {
  success: boolean;
  project: Project;
  railwayDeployment?: any;
  dnsRecord?: any;
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
  startCommand?: string;
  environmentVars?: Record<string, string>;
  techStack?: string[];
  featured?: boolean;
  previewImage?: string;
  customSubdomain?: string;
}

export class DeployAutomationService {
  /**
   * Deploy completo automático
   * 1. Criar projeto no Railway
   * 2. Configurar subdomínio no Cloudflare
   * 3. Atualizar banco de dados
   * 4. Iniciar deploy
   */
  async autoDeployProject(params: AutoDeployParams): Promise<DeployResult> {
    console.log("🚀 Iniciando deploy automático para:", params.name);

    const errors: string[] = [];
    let project: Project | null = null;
    let railwayProject = null;
    let dnsRecord = null;
    let deploymentId = "";

    try {
      // 1. Gerar subdomínio único
      const baseSubdomain =
        params.customSubdomain ||
        params.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");

      const subdomain =
        await cloudflareService.generateUniqueSubdomain(baseSubdomain);
      console.log("✅ Subdomínio gerado:", subdomain);

      // 2. Criar projeto no banco de dados primeiro
      project = await ProjectService.createProject({
        name: params.name,
        description: params.description || "",
        githubUrl: params.githubUrl,
        subdomain: subdomain,
        repositoryBranch: params.repositoryBranch || "main",
        buildCommand: params.buildCommand || "npm run build",
        techStack: params.techStack || [],
        featured: params.featured || false,
        environmentVars: params.environmentVars || {},
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

      // 4. Criar projeto no Railway
      try {
        const fullDomain = `${subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`;

        railwayProject = await railwayService.createProject({
          name: params.name,
          description: params.description,
          githubUrl: params.githubUrl,
          branch: params.repositoryBranch || "main",
          buildCommand: params.buildCommand,
          startCommand: params.startCommand,
          environmentVars: params.environmentVars,
          customDomain: fullDomain,
        });

        console.log("✅ Projeto criado no Railway:", railwayProject.id);

        // Atualizar projeto com Railway deployment URL
        if (
          railwayProject.deployments &&
          railwayProject.deployments.length > 0
        ) {
          await ProjectService.updateProject(project.id, {
            deployUrl: railwayProject.deployments[0].url,
          });
        }

        await ProjectService.updateProjectStatus(project.id, "BUILDING");
      } catch (railwayError) {
        const errorMsg = `Erro no Railway: ${railwayError instanceof Error ? railwayError.message : "Erro desconhecido"}`;
        errors.push(errorMsg);
        console.error("❌", errorMsg);

        // Atualizar status para erro
        await DeploymentService.updateDeploymentStatus(deploymentId, "FAILED", {
          errorLogs: [errorMsg],
        });
        await ProjectService.updateProjectStatus(project.id, "ERROR");
      }

      // 5. Configurar DNS no Cloudflare (mesmo se Railway falhou, para ter o subdomínio reservado)
      try {
        // Usar URL temporária ou Railway URL se disponível
        const railwayUrl =
          railwayProject?.deployments?.[0]?.url ||
          `${subdomain}-temp.railway.app`;

        dnsRecord = await cloudflareService.setupSubdomain({
          subdomain: subdomain,
          railwayUrl: railwayUrl,
          enableProxy: true,
          sslMode: "flexible",
        });

        console.log("✅ DNS configurado no Cloudflare");

        // Atualizar projeto com DNS info
        await ProjectService.updateProject(project.id, {
          cloudflareRecordId: dnsRecord.id,
          deployUrl: `https://${subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`,
        });
      } catch (cloudflareError) {
        const errorMsg = `Erro no Cloudflare: ${cloudflareError instanceof Error ? cloudflareError.message : "Erro desconhecido"}`;
        errors.push(errorMsg);
        console.error("❌", errorMsg);
      }

      // 6. Verificar status final
      const finalStatus =
        errors.length === 0
          ? "DEPLOYED"
          : errors.length === 1
            ? "PARTIAL"
            : "FAILED";

      if (finalStatus === "DEPLOYED") {
        await DeploymentService.updateDeploymentStatus(deploymentId, "SUCCESS");
        await ProjectService.updateProjectStatus(project.id, "DEPLOYED");
        console.log("🎉 Deploy automático concluído com sucesso!");
      } else {
        await DeploymentService.updateDeploymentStatus(
          deploymentId,
          "PARTIAL",
          errors.join("; ")
        );
        await ProjectService.updateProjectStatus(project.id, "PARTIAL");
        console.log("⚠️ Deploy parcial concluído com erros");
      }

      const fullUrl = `https://${subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`;

      return {
        success: errors.length === 0,
        project: (await ProjectService.getProjectById(project.id)) as Project,
        railwayDeployment: railwayProject,
        dnsRecord: dnsRecord,
        subdomain: subdomain,
        fullUrl: fullUrl,
        deploymentId: deploymentId,
        message:
          errors.length === 0
            ? `Projeto ${params.name} foi deployado com sucesso em ${fullUrl}`
            : `Deploy parcial - verifique os erros: ${errors.join(", ")}`,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMsg = `Erro crítico no deploy: ${error instanceof Error ? error.message : "Erro desconhecido"}`;
      console.error("❌", errorMsg);
      errors.push(errorMsg);

      // Cleanup em caso de erro crítico
      if (deploymentId) {
        await DeploymentService.updateDeploymentStatus(
          deploymentId,
          "FAILED",
          errorMsg
        );
      }
      if (project) {
        await ProjectService.updateProjectStatus(project.id, "FAILED");
      }

      return {
        success: false,
        project: project as Project,
        subdomain: baseSubdomain || "",
        fullUrl: "",
        deploymentId: deploymentId,
        message: errorMsg,
        errors: errors,
      };
    }
  }

  /**
   * Deploy projeto existente
   */
  async deployExistingProject(
    params: DeployProjectParams
  ): Promise<DeployResult> {
    console.log("🔄 Iniciando redeploy do projeto:", params.projectId);

    const errors: string[] = [];

    try {
      // 1. Buscar projeto
      const project = await ProjectService.getProjectById(params.projectId);
      if (!project) {
        throw new Error("Projeto não encontrado");
      }

      // 2. Verificar se já está sendo deployado
      if (!params.forceRedeploy) {
        const activeDeployments = await DeploymentService.getProjectDeployments(
          params.projectId,
          5
        );
        const hasActive = activeDeployments.some((d) =>
          ["PENDING", "IN_PROGRESS"].includes(d.status)
        );

        if (hasActive) {
          throw new Error("Projeto já está sendo deployado");
        }
      }

      // 3. Criar novo deployment
      const deployment = await DeploymentService.createDeployment({
        projectId: params.projectId,
        triggerBy: "manual",
        commitMessage: "Redeploy manual",
      });

      console.log("✅ Deployment criado:", deployment.id);

      // 4. Atualizar status
      await ProjectService.updateProjectStatus(params.projectId, "BUILDING");

      // 5. Trigger deploy no Railway se tiver Railway ID
      let railwayDeployment = null;
      if (project.railwayId) {
        try {
          railwayDeployment = await railwayService.triggerDeploy(
            project.railwayId
          );
          console.log("✅ Deploy iniciado no Railway");
        } catch (railwayError) {
          const errorMsg = `Erro ao iniciar deploy no Railway: ${railwayError instanceof Error ? railwayError.message : "Erro desconhecido"}`;
          errors.push(errorMsg);
          console.error("❌", errorMsg);
        }
      }

      // 6. Atualizar DNS se necessário (novo subdomínio)
      if (
        params.subdomain &&
        params.subdomain !== project.subdomain &&
        params.enableCustomDomain !== false
      ) {
        try {
          // Verificar se subdomínio está disponível
          const isAvailable = !(await cloudflareService.subdomainExists(
            params.subdomain
          ));

          if (!isAvailable) {
            throw new Error(`Subdomínio ${params.subdomain} já está em uso`);
          }

          // Criar novo registro DNS
          const railwayUrl = `${project.railwayId || "temp"}.up.railway.app`;
          const dnsRecord = await cloudflareService.setupSubdomain({
            subdomain: params.subdomain,
            railwayUrl: railwayUrl,
            enableProxy: true,
          });

          // Remover registro DNS antigo se existir
          if (project.cloudflareRecordId) {
            try {
              await cloudflareService.deleteDNSRecord(
                project.cloudflareRecordId
              );
            } catch (deleteError) {
              console.warn(
                "⚠️ Não foi possível remover DNS antigo:",
                deleteError
              );
            }
          }

          // Atualizar projeto
          await ProjectService.updateProject(params.projectId, {
            subdomain: params.subdomain,
            cloudflareRecordId: dnsRecord.id,
            deployUrl: `https://${params.subdomain}.${process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com"}`,
          });

          console.log("✅ DNS atualizado para novo subdomínio");
        } catch (dnsError) {
          const errorMsg = `Erro ao atualizar DNS: ${dnsError instanceof Error ? dnsError.message : "Erro desconhecido"}`;
          errors.push(errorMsg);
          console.error("❌", errorMsg);
        }
      }

      // 7. Finalizar
      const finalStatus = errors.length === 0 ? "SUCCESS" : "PARTIAL";
      await DeploymentService.updateDeploymentStatus(
        deployment.id,
        finalStatus,
        errors.join("; ")
      );

      if (errors.length === 0) {
        await ProjectService.updateProjectStatus(params.projectId, "DEPLOYED");
      }

      const updatedProject = (await ProjectService.getProjectById(
        params.projectId
      )) as Project;

      return {
        success: errors.length === 0,
        project: updatedProject,
        railwayDeployment: railwayDeployment,
        subdomain: updatedProject.subdomain || "",
        fullUrl: updatedProject.deployUrl || "",
        deploymentId: deployment.id,
        message:
          errors.length === 0
            ? "Redeploy concluído com sucesso!"
            : `Redeploy parcial - erros: ${errors.join(", ")}`,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMsg = `Erro no redeploy: ${error instanceof Error ? error.message : "Erro desconhecido"}`;
      console.error("❌", errorMsg);

      return {
        success: false,
        project: (await ProjectService.getProjectById(
          params.projectId
        )) as Project,
        subdomain: "",
        fullUrl: "",
        deploymentId: "",
        message: errorMsg,
        errors: [errorMsg],
      };
    }
  }

  /**
   * Monitorar status de deploy
   */
  async getDeployStatus(deploymentId: string): Promise<{
    status: string;
    railwayStatus?: string;
    dnsStatus?: string;
    logs?: string[];
  }> {
    try {
      const deployment =
        await DeploymentService.getDeploymentById(deploymentId);
      if (!deployment) {
        throw new Error("Deployment não encontrado");
      }

      const project = await ProjectService.getProjectById(deployment.projectId);
      const logs: string[] = [];

      // Verificar status no Railway
      let railwayStatus = "unknown";
      if (project?.railwayId) {
        try {
          const railwayDeployments = await railwayService.getProjectDeployments(
            project.railwayId,
            1
          );
          if (railwayDeployments.length > 0) {
            railwayStatus = railwayDeployments[0].status.toLowerCase();
          }
          logs.push(`Railway: ${railwayStatus}`);
        } catch (error) {
          logs.push(
            `Railway: erro ao verificar - ${error instanceof Error ? error.message : "erro desconhecido"}`
          );
        }
      }

      // Verificar DNS
      let dnsStatus = "unknown";
      if (project?.subdomain) {
        try {
          const exists = await cloudflareService.subdomainExists(
            project.subdomain
          );
          dnsStatus = exists ? "active" : "missing";
          logs.push(`DNS: ${dnsStatus}`);
        } catch (error) {
          logs.push(
            `DNS: erro ao verificar - ${error instanceof Error ? error.message : "erro desconhecido"}`
          );
        }
      }

      return {
        status: deployment.status,
        railwayStatus: railwayStatus,
        dnsStatus: dnsStatus,
        logs: logs,
      };
    } catch (error) {
      console.error("❌ Erro ao obter status do deploy:", error);
      return {
        status: "error",
        logs: [
          `Erro: ${error instanceof Error ? error.message : "erro desconhecido"}`,
        ],
      };
    }
  }
}

/**
 * Instância singleton do serviço de automação
 */
export const deployAutomationService = new DeployAutomationService();
