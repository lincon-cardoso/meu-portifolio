// Interfaces/Types
export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  deployUrl: string;
  subdomain: string;
  featured: boolean;
  status:
    | "idle"
    | "cloning"
    | "building"
    | "deploying"
    | "configuring-dns"
    | "deployed"
    | "online"
    | "error";
  techStack: string[];
  previewImage?: string;
  createdAt: Date;
  lastDeployed: Date | null;
  deployLogs?: string[];
  repositoryBranch?: string;
  buildCommand?: string;
  environmentVars?: Record<string, string>;
  analytics?: {
    views: number;
    visitors: number;
    bounceRate: number;
    loadTime: number;
  };
  totalDeployments?: number;
}

export interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  onlineProjects: number;
  deployingProjects: number;
  errorProjects: number;
}

export interface FilterType {
  value: "all" | "featured" | "deploying" | "online" | "error";
  label: string;
  icon: string;
}
