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
    | "error";
  techStack: string[];
  previewImage?: string;
  createdAt: Date;
  lastDeployed: Date;
  deployLogs: string[];
  repositoryBranch?: string;
  buildCommand?: string;
  environmentVars?: Record<string, string>;
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
