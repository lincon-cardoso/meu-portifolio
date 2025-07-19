/**
 * SCRIPT PARA TESTAR CONEXÃO E POPULAR BANCO
 * Execute: node scripts/seed.js
 */

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seedData() {
  try {
    console.log("🌱 Populando banco com dados de exemplo...");

    // Criar projetos de exemplo
    const project1 = await db.project.create({
      data: {
        name: "E-commerce React",
        description: "Loja virtual completa com React e Node.js",
        githubUrl: "https://github.com/lincon-cardoso/ecommerce-react",
        subdomain: "ecommerce-demo",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        featured: true,
        status: "DEPLOYED",
        previewImage: "/img/projects/ecommerce.jpg",
      },
    });

    const project2 = await db.project.create({
      data: {
        name: "Dashboard Analytics",
        description: "Dashboard para análise de dados em tempo real",
        githubUrl: "https://github.com/lincon-cardoso/dashboard-analytics",
        subdomain: "analytics-demo",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
        featured: true,
        status: "DEPLOYED",
        previewImage: "/img/projects/dashboard.jpg",
      },
    });

    const project3 = await db.project.create({
      data: {
        name: "Blog Pessoal",
        description: "Blog desenvolvido com Next.js e MDX",
        githubUrl: "https://github.com/lincon-cardoso/blog-pessoal",
        subdomain: "blog-demo",
        techStack: ["Next.js", "MDX", "Tailwind CSS"],
        featured: false,
        status: "IDLE",
      },
    });

    // Criar deployments
    await db.deployment.create({
      data: {
        projectId: project1.id,
        status: "SUCCESS",
        triggerBy: "GitHub Webhook",
        commitHash: "abc123def456",
        commitMessage: "feat: initial deployment",
        completedAt: new Date(),
        duration: 120,
        deployUrl: `https://${project1.subdomain}.devlincon.com.br`,
      },
    });

    await db.deployment.create({
      data: {
        projectId: project2.id,
        status: "SUCCESS",
        triggerBy: "Manual Deploy",
        commitHash: "def456ghi789",
        commitMessage: "fix: update dependencies",
        completedAt: new Date(),
        duration: 95,
        deployUrl: `https://${project2.subdomain}.devlincon.com.br`,
      },
    });

    // Criar analytics
    await db.projectAnalytics.create({
      data: {
        projectId: project1.id,
        totalViews: 1250,
        uniqueVisitors: 890,
        bounceRate: 0.25,
        avgSessionTime: 180,
        loadTime: 1.2,
        topPages: [
          { page: "/", views: 650, bounceRate: 0.3 },
          { page: "/produtos", views: 325, bounceRate: 0.2 },
          { page: "/carrinho", views: 275, bounceRate: 0.1 },
        ],
      },
    });

    await db.projectAnalytics.create({
      data: {
        projectId: project2.id,
        totalViews: 856,
        uniqueVisitors: 432,
        bounceRate: 0.18,
        avgSessionTime: 240,
        loadTime: 0.8,
        topPages: [
          { page: "/", views: 400, bounceRate: 0.15 },
          { page: "/dashboard", views: 280, bounceRate: 0.2 },
          { page: "/relatorios", views: 176, bounceRate: 0.25 },
        ],
      },
    });

    // Configurações do sistema
    await db.systemConfig.create({
      data: {
        key: "default_domain",
        value: "devlincon.com.br",
        type: "STRING",
        description: "Domínio padrão para subdomínios",
      },
    });

    console.log("✅ Dados inseridos com sucesso!");

    return { projects: 3, message: "Mock data criado com sucesso!" };
  } catch (error) {
    console.error("❌ Erro ao popular banco:", error);
    throw error;
  }
}

async function main() {
  try {
    console.log("🔍 Testando conexão com o banco...");

    // Testar conexão
    await db.$connect();
    console.log("✅ Conexão com PostgreSQL estabelecida!");

    // Verificar se já existem dados
    const existingProjects = await db.project.count();

    if (existingProjects > 0) {
      console.log(`📊 Banco já contém ${existingProjects} projeto(s)`);
      console.log("Pulando seed de dados...");
      return;
    }

    // Popular com dados de exemplo
    const result = await seedData();

    console.log(`📊 ${result.projects} projetos criados`);

    // Verificar dados inseridos
    const projectsCount = await db.project.count();
    const deploymentsCount = await db.deployment.count();
    const analyticsCount = await db.projectAnalytics.count();

    console.log("\n📈 Resumo do banco:");
    console.log(`   Projetos: ${projectsCount}`);
    console.log(`   Deployments: ${deploymentsCount}`);
    console.log(`   Analytics: ${analyticsCount}`);
  } catch (error) {
    console.error("❌ Erro ao conectar/popular banco:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
    console.log("🔌 Conexão fechada");
  }
}

main().catch((e) => {
  console.error("❌ Erro fatal:", e);
  process.exit(1);
});
