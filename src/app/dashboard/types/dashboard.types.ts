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
<<<<<<< HEAD
    | "online"
=======
>>>>>>> ff03523 (feat: add dashboard page styles and media queries)
    | "error";
  techStack: string[];
  previewImage?: string;
  createdAt: Date;
<<<<<<< HEAD
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
=======
  lastDeployed: Date;
  deployLogs: string[];
  repositoryBranch?: string;
  buildCommand?: string;
  environmentVars?: Record<string, string>;
>>>>>>> ff03523 (feat: add dashboard page styles and media queries)
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
<<<<<<< HEAD
=======

>>>>>>> ff03523 (feat: add dashboard page styles and media queries)
