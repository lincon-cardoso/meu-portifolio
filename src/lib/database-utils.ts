/**
 * UTILIDADES PARA GERENCIAMENTO DO BANCO DE DADOS
 * Funções auxiliares para operações com Prisma
 */

import { db } from "./db";
import type { ProjectStatus, DeploymentStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";

// ========================================
// PROJECT MANAGEMENT UTILITIES
// ========================================

export class ProjectService {
  /**
   * Criar um novo projeto
   */
  static async createProject(data: {
    name: string;
    description?: string;
    githubUrl: string;
    subdomain: string;
    repositoryBranch?: string;
    buildCommand?: string;
    techStack?: string[];
    environmentVars?: Record<string, string>;
    previewImage?: string;
    featured?: boolean;
  }) {
    return await db.project.create({
      data: {
        ...data,
        environmentVars: data.environmentVars || {},
        techStack: data.techStack || [],
        status: "IDLE",
      },
      include: {
        deployments: true,
        analytics: true,
      },
    });
  }

  /**
   * Buscar todos os projetos
   */
  static async getAllProjects() {
    return await db.project.findMany({
      include: {
        deployments: {
          orderBy: { startedAt: "desc" },
          take: 5, // Últimos 5 deployments
        },
        analytics: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Buscar projetos em destaque
   */
  static async getFeaturedProjects() {
    return await db.project.findMany({
      where: { featured: true },
      include: {
        deployments: {
          where: { status: "SUCCESS" },
          orderBy: { completedAt: "desc" },
          take: 1,
        },
        analytics: true,
      },
    });
  }

  /**
   * Buscar projeto por ID
   */
  static async getProjectById(id: string) {
    return await db.project.findUnique({
      where: { id },
      include: {
        deployments: {
          orderBy: { startedAt: "desc" },
          take: 5,
        },
        analytics: true,
      },
    });
  }

  /**
   * Buscar projeto por subdomínio
   */
  static async getProjectBySubdomain(subdomain: string) {
    return await db.project.findUnique({
      where: { subdomain },
    });
  }

  /**
   * Atualizar projeto
   */
  static async updateProject(
    id: string,
    data: {
      name?: string;
      description?: string;
      githubUrl?: string;
      subdomain?: string;
      repositoryBranch?: string;
      buildCommand?: string;
      techStack?: string[];
      featured?: boolean;
      environmentVars?: Record<string, string>;
      previewImage?: string;
    }
  ) {
    return await db.project.update({
      where: { id },
      data,
      include: {
        deployments: {
          orderBy: { startedAt: "desc" },
          take: 3,
        },
        analytics: true,
      },
    });
  }

  /**
   * Deletar projeto
   */
  static async deleteProject(id: string) {
    // Deletar em cascata: primeiro analytics e deployments, depois o projeto
    await db.$transaction([
      db.projectAnalytics.deleteMany({ where: { projectId: id } }),
      db.deployment.deleteMany({ where: { projectId: id } }),
      db.project.delete({ where: { id } }),
    ]);
  }

  /**
   * Atualizar status do projeto
   */
  static async updateProjectStatus(projectId: string, status: ProjectStatus) {
    return await db.project.update({
      where: { id: projectId },
      data: {
        status,
        lastDeployed: status === "DEPLOYED" ? new Date() : undefined,
      },
    });
  }
}

// ========================================
// DEPLOYMENT MANAGEMENT UTILITIES
// ========================================

export class DeploymentService {
  /**
   * Criar novo deployment
   */
  static async createDeployment(data: {
    projectId: string;
    triggerBy?: string;
    commitHash?: string;
    commitMessage?: string;
  }) {
    return await db.deployment.create({
      data: {
        ...data,
        status: "PENDING",
        logs: [],
        errorLogs: [],
      },
      include: {
        project: true,
      },
    });
  }

  /**
   * Atualizar status do deployment
   */
  static async updateDeploymentStatus(
    deploymentId: string,
    status: DeploymentStatus,
    data?: {
      logs?: string[];
      errorLogs?: string[];
      deployUrl?: string;
      previewUrl?: string;
    }
  ) {
    const updateData = {
      status,
      ...data,
      completedAt: undefined as Date | undefined,
      duration: undefined as number | undefined,
    };

    if (status === "SUCCESS" || status === "FAILED") {
      updateData.completedAt = new Date();

      // Calcular duração
      const deployment = await db.deployment.findUnique({
        where: { id: deploymentId },
        select: { startedAt: true },
      });

      if (deployment) {
        const duration = Math.floor(
          (new Date().getTime() - deployment.startedAt.getTime()) / 1000
        );
        updateData.duration = duration;
      }
    }

    return await db.deployment.update({
      where: { id: deploymentId },
      data: updateData,
      include: {
        project: true,
      },
    });
  }

  /**
   * Adicionar logs ao deployment
   */
  static async addDeploymentLogs(
    deploymentId: string,
    logs: string[],
    isError = false
  ) {
    const deployment = await db.deployment.findUnique({
      where: { id: deploymentId },
      select: { logs: true, errorLogs: true },
    });

    if (!deployment) return null;

    const currentLogs = isError ? deployment.errorLogs : deployment.logs;
    const newLogs = [...currentLogs, ...logs];

    return await db.deployment.update({
      where: { id: deploymentId },
      data: isError ? { errorLogs: newLogs } : { logs: newLogs },
    });
  }

  /**
   * Buscar deployments por projeto
   */
  static async getProjectDeployments(projectId: string, limit = 10) {
    return await db.deployment.findMany({
      where: { projectId },
      orderBy: { startedAt: "desc" },
      take: limit,
      include: {
        project: {
          select: { name: true, subdomain: true },
        },
      },
    });
  }
}

// ========================================
// ANALYTICS UTILITIES
// ========================================

export class AnalyticsService {
  /**
   * Criar ou atualizar analytics do projeto
   */
  static async upsertProjectAnalytics(
    projectId: string,
    data: {
      totalViews?: number;
      uniqueVisitors?: number;
      bounceRate?: number;
      avgSessionTime?: number;
      loadTime?: number;
      coreWebVitals?: Record<string, unknown>;
      topPages?: Array<{
        page: string;
        views: number;
        bounceRate: number;
      }>;
    }
  ) {
    return await db.projectAnalytics.upsert({
      where: { projectId },
      create: {
        projectId,
        totalViews: data.totalViews,
        uniqueVisitors: data.uniqueVisitors,
        bounceRate: data.bounceRate,
        avgSessionTime: data.avgSessionTime,
        loadTime: data.loadTime,
        topPages: data.topPages || [],
        coreWebVitals: (data.coreWebVitals || {}) as Prisma.InputJsonValue,
      },
      update: {
        totalViews: data.totalViews,
        uniqueVisitors: data.uniqueVisitors,
        bounceRate: data.bounceRate,
        avgSessionTime: data.avgSessionTime,
        loadTime: data.loadTime,
        topPages: data.topPages,
        coreWebVitals: data.coreWebVitals as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Incrementar visualizações
   */
  static async incrementViews(projectId: string, isUnique = false) {
    const current = await db.projectAnalytics.findUnique({
      where: { projectId },
    });

    if (!current) {
      return await this.upsertProjectAnalytics(projectId, {
        totalViews: 1,
        uniqueVisitors: isUnique ? 1 : 0,
      });
    }

    return await db.projectAnalytics.update({
      where: { projectId },
      data: {
        totalViews: { increment: 1 },
        ...(isUnique && { uniqueVisitors: { increment: 1 } }),
      },
    });
  }
}

// ========================================
// DASHBOARD STATS UTILITIES
// ========================================

export class DashboardService {
  /**
   * Buscar estatísticas do dashboard
   */
  static async getDashboardStats() {
    const [
      totalProjects,
      activeDeployments,
      successfulDeployments,
      failedDeployments,
      totalViews,
    ] = await Promise.all([
      // Total de projetos
      db.project.count(),

      // Deployments ativos
      db.deployment.count({
        where: {
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
      }),

      // Deployments com sucesso (últimos 30 dias)
      db.deployment.count({
        where: {
          status: "SUCCESS",
          completedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Deployments falhados (últimos 30 dias)
      db.deployment.count({
        where: {
          status: "FAILED",
          completedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Total de visualizações
      db.projectAnalytics.aggregate({
        _sum: { totalViews: true },
      }),
    ]);

    // Calcular taxa de sucesso
    const totalRecentDeployments = successfulDeployments + failedDeployments;
    const successRate =
      totalRecentDeployments > 0
        ? (successfulDeployments / totalRecentDeployments) * 100
        : 0;

    return {
      totalProjects,
      activeDeployments,
      successfulDeployments,
      failedDeployments,
      totalViews: totalViews._sum.totalViews || 0,
      successRate: Math.round(successRate),

      // Dados para gráficos
      trends: {
        deploymentsLast7Days: await this.getDeploymentTrends(),
        topProjects: await this.getTopProjects(),
      },
    };
  }

  /**
   * Buscar tendências de deployment (últimos 7 dias)
   */
  private static async getDeploymentTrends() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const deployments = await db.deployment.findMany({
      where: {
        startedAt: { gte: sevenDaysAgo },
      },
      select: {
        startedAt: true,
        status: true,
      },
    });

    // Agrupar por dia
    const trends = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);

      const dayDeployments = deployments.filter(
        (d: { startedAt: Date; status: string }) =>
          d.startedAt.toDateString() === date.toDateString()
      );

      return {
        date: date.toISOString().split("T")[0],
        total: dayDeployments.length,
        success: dayDeployments.filter(
          (d: { status: string }) => d.status === "SUCCESS"
        ).length,
        failed: dayDeployments.filter(
          (d: { status: string }) => d.status === "FAILED"
        ).length,
      };
    });

    return trends;
  }

  /**
   * Buscar projetos mais populares
   */
  private static async getTopProjects() {
    return await db.project.findMany({
      include: {
        analytics: {
          select: {
            totalViews: true,
            uniqueVisitors: true,
          },
        },
        _count: {
          select: {
            deployments: true,
          },
        },
      },
      orderBy: {
        analytics: {
          totalViews: "desc",
        },
      },
      take: 5,
    });
  }
}

// ========================================
// SYSTEM CONFIGURATION UTILITIES
// ========================================

export class ConfigService {
  /**
   * Buscar configuração do sistema
   */
  static async getConfig(key: string) {
    const config = await db.systemConfig.findUnique({
      where: { key },
    });

    if (!config) return null;

    // Parse do valor baseado no tipo
    switch (config.type) {
      case "NUMBER":
        return parseFloat(config.value);
      case "BOOLEAN":
        return config.value === "true";
      case "JSON":
        return JSON.parse(config.value);
      default:
        return config.value;
    }
  }

  /**
   * Definir configuração do sistema
   */
  static async setConfig(key: string, value: unknown, description?: string) {
    const type =
      typeof value === "number"
        ? "NUMBER"
        : typeof value === "boolean"
          ? "BOOLEAN"
          : typeof value === "object"
            ? "JSON"
            : "STRING";

    const stringValue = type === "JSON" ? JSON.stringify(value) : String(value);

    return await db.systemConfig.upsert({
      where: { key },
      create: {
        key,
        value: stringValue,
        type,
        description,
      },
      update: {
        value: stringValue,
        type,
        description,
      },
    });
  }
}

// ========================================
// MOCK DATA SEEDER
// ========================================

export class SeederService {
  /**
   * Popular banco com dados de exemplo
   */
  static async seedMockData() {
    console.log("🌱 Populando banco com dados de exemplo...");

    // Criar projetos de exemplo
    const projects = await Promise.all([
      ProjectService.createProject({
        name: "E-commerce React",
        description: "Loja virtual completa com React e Node.js",
        githubUrl: "https://github.com/usuario/ecommerce-react",
        subdomain: "ecommerce-demo",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        featured: true,
        previewImage: "/img/projects/ecommerce.jpg",
      }),

      ProjectService.createProject({
        name: "Dashboard Analytics",
        description: "Dashboard para análise de dados em tempo real",
        githubUrl: "https://github.com/usuario/dashboard-analytics",
        subdomain: "analytics-demo",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
        featured: true,
        previewImage: "/img/projects/dashboard.jpg",
      }),

      ProjectService.createProject({
        name: "Blog Pessoal",
        description: "Blog desenvolvido com Next.js e MDX",
        githubUrl: "https://github.com/usuario/blog-pessoal",
        subdomain: "blog-demo",
        techStack: ["Next.js", "MDX", "Tailwind CSS"],
        featured: false,
      }),
    ]);

    // Criar deployments para os projetos
    for (const project of projects) {
      await DeploymentService.createDeployment({
        projectId: project.id,
        triggerBy: "GitHub Webhook",
        commitHash: "abc123def456",
        commitMessage: "feat: initial deployment",
      });

      // Simular analytics
      await AnalyticsService.upsertProjectAnalytics(project.id, {
        totalViews: Math.floor(Math.random() * 1000) + 100,
        uniqueVisitors: Math.floor(Math.random() * 500) + 50,
        bounceRate: Math.random() * 0.5 + 0.2,
        avgSessionTime: Math.floor(Math.random() * 300) + 60,
        loadTime: Math.random() * 2 + 0.5,
        topPages: [
          { page: "/", views: 150, bounceRate: 0.3 },
          { page: "/sobre", views: 85, bounceRate: 0.4 },
          { page: "/contato", views: 42, bounceRate: 0.6 },
        ],
      });
    }

    // Configurações do sistema
    await ConfigService.setConfig(
      "default_domain",
      "devlincon.com.br",
      "Domínio padrão para subdomínios"
    );

    await ConfigService.setConfig(
      "github_webhook_secret",
      "webhook_secret_key_here",
      "Chave secreta para webhooks do GitHub"
    );

    console.log("✅ Dados de exemplo criados com sucesso!");

    return {
      projects: projects.length,
      message: "Mock data criado com sucesso!",
    };
  }
}
