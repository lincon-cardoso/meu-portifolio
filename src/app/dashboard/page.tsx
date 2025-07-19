"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Project,
  DashboardStats,
  FilterType,
} from "@/app/dashboard/types/dashboard.types";
import "@/style/pages/dashboard/dashboard.scss";

export default function DashboardPage() {
  // Estados principais
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    featuredProjects: 0,
    onlineProjects: 0,
    deployingProjects: 0,
    errorProjects: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType["value"]>("all");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtros disponíveis
  const filters: FilterType[] = [
    { value: "all", label: "Todos", icon: "📋" },
    { value: "featured", label: "Destacados", icon: "⭐" },
    { value: "online", label: "Online", icon: "🟢" },
    { value: "deploying", label: "Deploying", icon: "🔄" },
    { value: "error", label: "Com Erro", icon: "❌" },
  ];

  const updateStats = useCallback(() => {
    const newStats: DashboardStats = {
      totalProjects: projects.length,
      featuredProjects: projects.filter((p) => p.featured).length,
      onlineProjects: projects.filter(
        (p) => p.status === "online" || p.status === "deployed"
      ).length,
      deployingProjects: projects.filter((p) =>
        ["cloning", "building", "deploying", "configuring-dns"].includes(
          p.status
        )
      ).length,
      errorProjects: projects.filter((p) => p.status === "error").length,
    };
    setStats(newStats);
  }, [projects]);

  // Carregar dados iniciais
  useEffect(() => {
    loadDashboardData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Atualizar estatísticas quando projetos mudarem
  useEffect(() => {
    updateStats();
  }, [projects, updateStats]);

  const loadDashboardData = async () => {
    setIsLoading(true);

    try {
      // Carregar dados das APIs reais
      const [projectsResponse, statsResponse] = await Promise.all([
        fetch("/api/dashboard/projects"),
        fetch("/api/dashboard/stats"),
      ]);

      if (!projectsResponse.ok || !statsResponse.ok) {
        throw new Error("Erro ao carregar dados do dashboard");
      }

      const projectsData = await projectsResponse.json();
      const statsData = await statsResponse.json();

      if (projectsData.success && statsData.success) {
        // Mapear os dados da API para o formato esperado pelo dashboard
        const mappedProjects: Project[] = projectsData.data.map(
          (project: {
            id: string;
            name: string;
            description: string;
            deployUrl: string | null;
            githubUrl: string;
            subdomain: string;
            featured: boolean;
            status: string;
            techStack: string[];
            createdAt: string;
            lastDeployed: string | null;
            analytics?: {
              totalViews?: number;
              uniqueVisitors?: number;
              bounceRate?: number;
              loadTime?: number;
            };
            _count?: { deployments: number };
            previewImage: string | null;
          }) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            deployUrl: project.deployUrl,
            githubUrl: project.githubUrl,
            subdomain: project.subdomain,
            featured: project.featured,
            status: mapProjectStatus(project.status),
            techStack: project.techStack || [],
            createdAt: new Date(project.createdAt),
            lastDeployed: project.lastDeployed
              ? new Date(project.lastDeployed)
              : null,
            analytics: project.analytics
              ? {
                  views: project.analytics.totalViews || 0,
                  visitors: project.analytics.uniqueVisitors || 0,
                  bounceRate: project.analytics.bounceRate || 0,
                  loadTime: project.analytics.loadTime || 0,
                }
              : null,
            totalDeployments: project._count?.deployments || 0,
            previewImage: project.previewImage,
          })
        );

        setProjects(mappedProjects);

        // Mapear as estatísticas da API
        const mappedStats: DashboardStats = {
          totalProjects: statsData.data.totalProjects,
          featuredProjects: mappedProjects.filter((p) => p.featured).length,
          onlineProjects: mappedProjects.filter(
            (p) => p.status === "online" || p.status === "deployed"
          ).length,
          deployingProjects: statsData.data.activeDeployments,
          errorProjects: mappedProjects.filter((p) => p.status === "error")
            .length,
        };

        setStats(mappedStats);
      } else {
        console.error("Erro nos dados da API:", projectsData, statsData);
        loadFallbackData();
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
      loadFallbackData();
    } finally {
      setIsLoading(false);
    }
  };

  // Função para mapear status da API para status do dashboard
  const mapProjectStatus = (apiStatus: string): Project["status"] => {
    switch (apiStatus?.toUpperCase()) {
      case "DEPLOYED":
        return "online";
      case "BUILDING":
      case "DEPLOYING":
        return "deploying";
      case "FAILED":
        return "error";
      case "IDLE":
      default:
        return "idle";
    }
  };

  // Dados fallback em caso de erro
  const loadFallbackData = () => {
    const fallbackProjects: Project[] = [
      {
        id: "1",
        name: "E-commerce React",
        description: "Loja virtual completa com React e Node.js",
        deployUrl: "https://ecommerce-demo.devlincon.com.br",
        githubUrl: "https://github.com/lincon-cardoso/ecommerce-react",
        subdomain: "ecommerce-demo",
        featured: true,
        status: "online",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        createdAt: new Date("2024-01-15"),
        lastDeployed: new Date("2024-01-20"),
        analytics: {
          views: 1250,
          visitors: 890,
          bounceRate: 25,
          loadTime: 1.2,
        },
        totalDeployments: 12,
        previewImage: "/img/projects/ecommerce.jpg",
      },
      {
        id: "2",
        name: "Dashboard Analytics",
        description: "Dashboard para análise de dados em tempo real",
        deployUrl: "https://analytics-demo.devlincon.com.br",
        githubUrl: "https://github.com/lincon-cardoso/dashboard-analytics",
        subdomain: "analytics-demo",
        featured: true,
        status: "online",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
        createdAt: new Date("2024-01-10"),
        lastDeployed: new Date("2024-01-18"),
        analytics: {
          views: 856,
          visitors: 432,
          bounceRate: 18,
          loadTime: 0.8,
        },
        totalDeployments: 8,
        previewImage: "/img/projects/dashboard.jpg",
      },
      {
        id: "3",
        name: "Blog Pessoal",
        description: "Blog desenvolvido com Next.js e MDX",
        deployUrl: "https://blog-demo.devlincon.com.br",
        githubUrl: "https://github.com/lincon-cardoso/blog-pessoal",
        subdomain: "blog-demo",
        featured: false,
        status: "deploying",
        techStack: ["Next.js", "MDX", "Tailwind CSS"],
        createdAt: new Date("2024-01-12"),
        lastDeployed: null,
        analytics: {
          views: 0,
          visitors: 0,
          bounceRate: 0,
          loadTime: 0,
        },
        totalDeployments: 0,
      },
    ];

    setProjects(fallbackProjects);

    // Definir stats fallback também
    const fallbackStats: DashboardStats = {
      totalProjects: fallbackProjects.length,
      featuredProjects: fallbackProjects.filter((p) => p.featured).length,
      onlineProjects: fallbackProjects.filter((p) => p.status === "online")
        .length,
      deployingProjects: fallbackProjects.filter(
        (p) => p.status === "deploying"
      ).length,
      errorProjects: fallbackProjects.filter((p) => p.status === "error")
        .length,
    };

    setStats(fallbackStats);
  };

  // Filtrar projetos por filtro ativo e termo de busca
  const filteredProjects = projects.filter((project) => {
    // Filtro por categoria
    let matchesFilter = true;
    if (filter === "featured") matchesFilter = project.featured;
    else if (filter === "deploying") {
      matchesFilter = [
        "cloning",
        "building",
        "deploying",
        "configuring-dns",
      ].includes(project.status);
    } else if (filter === "online")
      matchesFilter =
        project.status === "online" || project.status === "deployed";
    else if (filter === "error") matchesFilter = project.status === "error";

    // Filtro por busca
    const matchesSearch =
      searchTerm === "" ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  const handleToggleFeatured = async (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, featured: !project.featured }
          : project
      )
    );

    // Futuramente: chamar API para salvar no banco
    // await fetch(`/api/projects/${projectId}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ featured: !project.featured })
    // });
  };

  const handleCreateProject = () => {
    setIsCreatingProject(true);
  };

  const handleRetryDeploy = async (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: "cloning",
              deployLogs: ["Reiniciando deploy..."],
            }
          : project
      )
    );

    // Futuramente: chamar API de redeploy
    // await fetch(`/api/projects/${projectId}/redeploy`, { method: 'POST' });
  };

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "deployed":
        return "✅";
      case "deploying":
        return "🔄";
      case "building":
        return "🔨";
      case "cloning":
        return "📥";
      case "configuring-dns":
        return "🌐";
      case "error":
        return "❌";
      default:
        return "⏸️";
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "deployed":
        return "Online";
      case "deploying":
        return "Fazendo Deploy";
      case "building":
        return "Buildando";
      case "cloning":
        return "Clonando";
      case "configuring-dns":
        return "Configurando DNS";
      case "error":
        return "Erro";
      default:
        return "Parado";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Nunca";
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        {/* Header do Dashboard */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Gerencie seus projetos e deploys automatizados
            </p>
          </div>

          <div className="header-actions">
            <button className="btn-secondary" title="Ver Analytics">
              <span className="icon">📊</span>
              <span className="text">Analytics</span>
            </button>
            <button
              className="btn-primary"
              onClick={handleCreateProject}
              disabled={isCreatingProject}
              title="Criar Novo Projeto"
            >
              <span className="icon">➕</span>
              <span className="text">
                {isCreatingProject ? "Criando..." : "Novo Projeto"}
              </span>
            </button>
          </div>
        </div>

        {/* Estatísticas do Dashboard */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalProjects}</span>
              <span className="stat-label">Projetos Totais</span>
            </div>
          </div>

          <div className="stat-card featured">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-number">{stats.featuredProjects}</span>
              <span className="stat-label">Em Destaque</span>
            </div>
          </div>

          <div className="stat-card online">
            <div className="stat-icon">🟢</div>
            <div className="stat-content">
              <span className="stat-number">{stats.onlineProjects}</span>
              <span className="stat-label">Online</span>
            </div>
          </div>

          <div className="stat-card deploying">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <span className="stat-number">{stats.deployingProjects}</span>
              <span className="stat-label">Deploying</span>
            </div>
          </div>

          {stats.errorProjects > 0 && (
            <div className="stat-card error">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <span className="stat-number">{stats.errorProjects}</span>
                <span className="stat-label">Com Erro</span>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="dashboard-controls">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="dashboard-filters">
            {filters.map((filterOption) => (
              <button
                key={filterOption.value}
                className={`filter-btn ${filter === filterOption.value ? "active" : ""}`}
                onClick={() => setFilter(filterOption.value)}
              >
                <span className="filter-icon">{filterOption.icon}</span>
                {filterOption.label} (
                {filterOption.value === "all"
                  ? stats.totalProjects
                  : filterOption.value === "featured"
                    ? stats.featuredProjects
                    : filterOption.value === "online"
                      ? stats.onlineProjects
                      : filterOption.value === "deploying"
                        ? stats.deployingProjects
                        : stats.errorProjects}
                )
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="dashboard-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Carregando projetos...</p>
            </div>
          ) : (
            <div className="projects-section">
              {filteredProjects.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📂</div>
                  <h3>
                    {searchTerm
                      ? "Nenhum projeto encontrado"
                      : "Nenhum projeto encontrado"}
                  </h3>
                  <p>
                    {searchTerm
                      ? `Nenhum projeto corresponde à busca "${searchTerm}"`
                      : filter === "all"
                        ? "Comece criando seu primeiro projeto!"
                        : `Nenhum projeto ${filter === "featured" ? "destacado" : filter} encontrado.`}
                  </p>
                  {filter === "all" && !searchTerm && (
                    <button
                      className="btn-primary"
                      onClick={handleCreateProject}
                    >
                      Criar Primeiro Projeto
                    </button>
                  )}
                </div>
              ) : (
                <div className="projects-grid">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="project-card">
                      <div className="card-header">
                        <div className="project-info">
                          <h3 className="project-name">{project.name}</h3>
                          <p className="project-description">
                            {project.description}
                          </p>
                        </div>

                        <div className="project-status">
                          <span className={`status-badge ${project.status}`}>
                            {getStatusIcon(project.status)}{" "}
                            {getStatusText(project.status)}
                          </span>
                        </div>
                      </div>

                      <div className="card-content">
                        <div className="project-tech">
                          {project.techStack.map((tech, index) => (
                            <span key={index} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="project-meta">
                          <div className="meta-item">
                            <strong>Criado:</strong>{" "}
                            {formatDate(project.createdAt)}
                          </div>
                          <div className="meta-item">
                            <strong>Último deploy:</strong>{" "}
                            {formatDate(project.lastDeployed)}
                          </div>
                          <div className="meta-item">
                            <strong>Branch:</strong>{" "}
                            {project.repositoryBranch || "main"}
                          </div>
                        </div>

                        <div className="project-links">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link github"
                          >
                            <span className="link-icon">📁</span>
                            GitHub
                          </a>

                          {project.status === "deployed" && (
                            <a
                              href={project.deployUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link deploy"
                            >
                              <span className="link-icon">🌐</span>
                              Ver Site
                            </a>
                          )}
                        </div>

                        <div className="project-domain">
                          <strong>Domínio:</strong> {project.subdomain}
                          .devlincon.com.br
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          onClick={() => handleToggleFeatured(project.id)}
                          className={`btn-feature ${project.featured ? "featured" : ""}`}
                          title={
                            project.featured
                              ? "Remover destaque"
                              : "Destacar projeto"
                          }
                        >
                          {project.featured ? "⭐ Destacado" : "☆ Destacar"}
                        </button>

                        <button className="btn-edit" title="Editar projeto">
                          ✏️ Editar
                        </button>

                        <button className="btn-logs" title="Ver logs de deploy">
                          📋 Logs
                        </button>

                        {project.status === "error" && (
                          <button
                            className="btn-retry"
                            title="Tentar deploy novamente"
                            onClick={() => handleRetryDeploy(project.id)}
                          >
                            🔄 Retry
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal de criação de projeto (placeholder) */}
        {isCreatingProject && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Criar Novo Projeto</h3>
                <button
                  className="modal-close"
                  onClick={() => setIsCreatingProject(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p>Modal de criação será implementado na próxima fase...</p>
                <p>Aqui teremos:</p>
                <ul>
                  <li>✅ Conectar GitHub</li>
                  <li>✅ Selecionar repositório</li>
                  <li>✅ Configurar deploy</li>
                  <li>✅ Deploy automático</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => setIsCreatingProject(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
