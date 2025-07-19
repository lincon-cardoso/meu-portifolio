/**
 * SCRIPT PARA TESTAR CONEXÃO E POPULAR BANCO
 * Execute: npm run db:seed
 */

import { db } from "../src/lib/db.js";
import { SeederService } from "../src/lib/database-utils.js";

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

    console.log("🌱 Populando banco com dados de exemplo...");

    // Popular com dados de exemplo
    const result = await SeederService.seedMockData();

    console.log("✅ Dados inseridos com sucesso!");
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
