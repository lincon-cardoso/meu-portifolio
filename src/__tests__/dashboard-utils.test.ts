// Testes para funções utilitárias do Dashboard
import { Project, DashboardStats } from "@/app/dashboard/types/dashboard.types";

// Função helper para calcular estatísticas
function calculateStats(projects: Project[]): DashboardStats {
  return {
    totalProjects: projects.length,
    featuredProjects: projects.filter((p) => p.featured).length,
    onlineProjects: projects.filter((p) => p.status === "deployed").length,
    deployingProjects: projects.filter((p) =>
      ["cloning", "building", "deploying", "configuring-dns"].includes(p.status)
    ).length,
    errorProjects: projects.filter((p) => p.status === "error").length,
  };
}

// Mock data for testing
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Test Project 1",
    description: "Test description",
    githubUrl: "https://github.com/test/project1",
    deployUrl: "https://project1.test.com",
    subdomain: "project1",
    featured: true,
    status: "deployed",
    techStack: ["React", "TypeScript"],
    createdAt: new Date("2024-01-01"),
    lastDeployed: new Date("2024-01-02"),
    deployLogs: ["Deploy successful"],
  },
  {
    id: "2",
    name: "Test Project 2",
    description: "Test description 2",
    githubUrl: "https://github.com/test/project2",
    deployUrl: "https://project2.test.com",
    subdomain: "project2",
    featured: false,
    status: "building",
    techStack: ["Next.js", "SCSS"],
    createdAt: new Date("2024-01-03"),
    lastDeployed: new Date("2024-01-04"),
    deployLogs: ["Build in progress"],
  },
  {
    id: "3",
    name: "Test Project 3",
    description: "Test description 3",
    githubUrl: "https://github.com/test/project3",
    deployUrl: "https://project3.test.com",
    subdomain: "project3",
    featured: true,
    status: "error",
    techStack: ["Vue.js"],
    createdAt: new Date("2024-01-05"),
    lastDeployed: new Date("2024-01-06"),
    deployLogs: ["Deploy failed"],
  },
];

describe("Dashboard Utils", () => {
  describe("calculateStats", () => {
    it("should calculate correct statistics for empty projects array", () => {
      const stats = calculateStats([]);

      expect(stats.totalProjects).toBe(0);
      expect(stats.featuredProjects).toBe(0);
      expect(stats.onlineProjects).toBe(0);
      expect(stats.deployingProjects).toBe(0);
      expect(stats.errorProjects).toBe(0);
    });

    it("should calculate correct statistics for mock projects", () => {
      const stats = calculateStats(mockProjects);

      expect(stats.totalProjects).toBe(3);
      expect(stats.featuredProjects).toBe(2); // projects 1 and 3
      expect(stats.onlineProjects).toBe(1); // project 1 (deployed)
      expect(stats.deployingProjects).toBe(1); // project 2 (building)
      expect(stats.errorProjects).toBe(1); // project 3 (error)
    });

    it("should handle projects with different statuses", () => {
      const testProjects: Project[] = [
        { ...mockProjects[0], status: "cloning" },
        { ...mockProjects[1], status: "deploying" },
        { ...mockProjects[2], status: "configuring-dns" },
      ];

      const stats = calculateStats(testProjects);

      expect(stats.deployingProjects).toBe(3); // all are in deploying states
      expect(stats.onlineProjects).toBe(0);
      expect(stats.errorProjects).toBe(0);
    });
  });

  describe("Project filtering", () => {
    it("should filter featured projects correctly", () => {
      const featured = mockProjects.filter((p) => p.featured);

      expect(featured).toHaveLength(2);
      expect(featured[0].name).toBe("Test Project 1");
      expect(featured[1].name).toBe("Test Project 3");
    });

    it("should filter by status correctly", () => {
      const deployed = mockProjects.filter((p) => p.status === "deployed");
      const building = mockProjects.filter((p) => p.status === "building");
      const error = mockProjects.filter((p) => p.status === "error");

      expect(deployed).toHaveLength(1);
      expect(building).toHaveLength(1);
      expect(error).toHaveLength(1);
    });

    it("should filter by tech stack correctly", () => {
      const reactProjects = mockProjects.filter((p) =>
        p.techStack.includes("React")
      );
      const nextProjects = mockProjects.filter((p) =>
        p.techStack.includes("Next.js")
      );

      expect(reactProjects).toHaveLength(1);
      expect(nextProjects).toHaveLength(1);
    });
  });
});
