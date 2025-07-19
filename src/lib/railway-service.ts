/**
 * RAILWAY DEPLOY SERVICE
 * Serviço para integração com Railway API
 * Funcionalidades: Deploy automático, configuração de variáveis, monitoramento
 */

interface RailwayConfig {
  apiToken: string;
  teamId?: string;
}

interface RailwayProject {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  deployments: RailwayDeployment[];
}

interface RailwayDeployment {
  id: string;
  status: "BUILDING" | "SUCCESS" | "FAILED" | "CRASHED";
  url?: string;
  createdAt: string;
  finishedAt?: string;
}

interface RailwayServiceData {
  id: string;
  name: string;
  projectId: string;
  variables: Record<string, string>;
}

interface CreateRailwayProjectParams {
  name: string;
  description?: string;
  githubUrl: string;
  branch?: string;
  buildCommand?: string;
  startCommand?: string;
  environmentVars?: Record<string, string>;
  customDomain?: string;
}

export class RailwayService {
  private config: RailwayConfig;
  private baseUrl = "https://backboard.railway.app/graphql";

  constructor(config: RailwayConfig) {
    this.config = config;
  }

  /**
   * Criar um novo projeto no Railway
   */
  async createProject(
    params: CreateRailwayProjectParams
  ): Promise<RailwayProject> {
    try {
      console.log("🚀 Criando projeto no Railway:", params.name);

      const mutation = `
        mutation ProjectCreate($input: ProjectCreateInput!) {
          projectCreate(input: $input) {
            id
            name
            description
            isPublic
          }
        }
      `;

      const variables = {
        input: {
          name: params.name,
          description: params.description,
          isPublic: false,
        },
      };

      const response = await this.makeRequest(mutation, variables);
      const project = response.data.projectCreate;

      console.log("✅ Projeto criado no Railway:", project.id);

      // Conectar repositório GitHub
      await this.connectGitHubRepo(project.id, params.githubUrl, params.branch);

      // Configurar variáveis de ambiente
      if (params.environmentVars) {
        await this.setEnvironmentVariables(project.id, params.environmentVars);
      }

      // Configurar comandos de build
      if (params.buildCommand || params.startCommand) {
        await this.configureBuildSettings(project.id, {
          buildCommand: params.buildCommand,
          startCommand: params.startCommand,
        });
      }

      // Configurar domínio customizado
      if (params.customDomain) {
        await this.addCustomDomain(project.id, params.customDomain);
      }

      return project;
    } catch (error: unknown) {
      console.error("❌ Erro ao criar projeto no Railway:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      throw new Error(`Falha ao criar projeto no Railway: ${errorMessage}`);
    }
  }

  /**
   * Conectar repositório GitHub ao projeto
   */
  private async connectGitHubRepo(
    projectId: string,
    githubUrl: string,
    branch = "main"
  ): Promise<void> {
    try {
      // Extrair owner/repo da URL
      const urlParts = githubUrl.replace("https://github.com/", "").split("/");
      const owner = urlParts[0];
      const repo = urlParts[1].replace(".git", "");

      const mutation = `
        mutation ServiceCreate($input: ServiceCreateInput!) {
          serviceCreate(input: $input) {
            id
            name
          }
        }
      `;

      const variables = {
        input: {
          projectId,
          source: {
            repo: `${owner}/${repo}`,
            branch,
          },
        },
      };

      await this.makeRequest(mutation, variables);
      console.log("✅ Repositório GitHub conectado");
    } catch (error) {
      console.error("❌ Erro ao conectar GitHub:", error);
      throw error;
    }
  }

  /**
   * Configurar variáveis de ambiente
   */
  private async setEnvironmentVariables(
    projectId: string,
    variables: Record<string, string>
  ): Promise<void> {
    try {
      for (const [key, value] of Object.entries(variables)) {
        const mutation = `
          mutation VariableUpsert($input: VariableUpsertInput!) {
            variableUpsert(input: $input) {
              id
              name
              value
            }
          }
        `;

        const variableInput = {
          input: {
            projectId,
            name: key,
            value: value,
          },
        };

        await this.makeRequest(mutation, variableInput);
      }

      console.log("✅ Variáveis de ambiente configuradas");
    } catch (error) {
      console.error("❌ Erro ao configurar variáveis:", error);
      throw error;
    }
  }

  /**
   * Configurar comandos de build
   */
  private async configureBuildSettings(
    projectId: string,
    settings: { buildCommand?: string; startCommand?: string }
  ): Promise<void> {
    try {
      const mutation = `
        mutation ServiceUpdate($input: ServiceUpdateInput!) {
          serviceUpdate(input: $input) {
            id
            name
          }
        }
      `;

      const variables = {
        input: {
          serviceId: projectId, // Assumindo que o serviceId é o mesmo que projectId
          buildCommand: settings.buildCommand,
          startCommand: settings.startCommand,
        },
      };

      await this.makeRequest(mutation, variables);
      console.log("✅ Configurações de build atualizadas");
    } catch (error) {
      console.error("❌ Erro ao configurar build:", error);
      throw error;
    }
  }

  /**
   * Adicionar domínio customizado
   */
  private async addCustomDomain(
    projectId: string,
    domain: string
  ): Promise<void> {
    try {
      const mutation = `
        mutation CustomDomainCreate($input: CustomDomainCreateInput!) {
          customDomainCreate(input: $input) {
            id
            domain
            status
          }
        }
      `;

      const variables = {
        input: {
          serviceId: projectId,
          domain: domain,
        },
      };

      const response = await this.makeRequest(mutation, variables);
      console.log(
        "✅ Domínio customizado adicionado:",
        response.data.customDomainCreate
      );
    } catch (error) {
      console.error("❌ Erro ao adicionar domínio:", error);
      throw error;
    }
  }

  /**
   * Iniciar deploy manual
   */
  async triggerDeploy(projectId: string): Promise<RailwayDeployment> {
    try {
      const mutation = `
        mutation ServiceRedeploy($input: ServiceRedeployInput!) {
          serviceRedeploy(input: $input) {
            id
            status
            createdAt
          }
        }
      `;

      const variables = {
        input: {
          serviceId: projectId,
        },
      };

      const response = await this.makeRequest(mutation, variables);
      return response.data.serviceRedeploy;
    } catch (error) {
      console.error("❌ Erro ao iniciar deploy:", error);
      throw error;
    }
  }

  /**
   * Obter status do deployment
   */
  async getDeploymentStatus(deploymentId: string): Promise<RailwayDeployment> {
    try {
      const query = `
        query Deployment($id: String!) {
          deployment(id: $id) {
            id
            status
            url
            createdAt
            finishedAt
          }
        }
      `;

      const variables = { id: deploymentId };
      const response = await this.makeRequest(query, variables);
      return response.data.deployment;
    } catch (error) {
      console.error("❌ Erro ao obter status do deployment:", error);
      throw error;
    }
  }

  /**
   * Listar deployments de um projeto
   */
  async getProjectDeployments(
    projectId: string,
    limit = 10
  ): Promise<RailwayDeployment[]> {
    try {
      const query = `
        query Project($id: String!) {
          project(id: $id) {
            deployments(first: ${limit}) {
              edges {
                node {
                  id
                  status
                  url
                  createdAt
                  finishedAt
                }
              }
            }
          }
        }
      `;

      const variables = { id: projectId };
      const response = await this.makeRequest(query, variables);

      return response.data.project.deployments.edges.map(
        (edge: { node: RailwayDeployment }) => edge.node
      );
    } catch (error) {
      console.error("❌ Erro ao listar deployments:", error);
      throw error;
    }
  }

  /**
   * Fazer requisição GraphQL para Railway API
   */
  private async makeRequest(
    query: string,
    variables: Record<string, unknown>
  ): Promise<{ data: any; errors?: any[] }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiToken}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Railway API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data;
    } catch (error) {
      console.error("❌ Erro na requisição Railway:", error);
      throw error;
    }
  }
}

/**
 * Instância singleton do serviço Railway
 */
export const railwayService = new RailwayService({
  apiToken: process.env.RAILWAY_API_TOKEN || "",
  teamId: process.env.RAILWAY_TEAM_ID,
});
