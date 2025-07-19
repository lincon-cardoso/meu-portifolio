/**
 * SCRIPT DE TESTE PARA AUTO-DEPLOY API
 * Testa a integração completa Railway + Cloudflare
 */

const API_BASE = "http://localhost:3000/api";

// Dados de teste para auto-deploy
const testProjectData = {
  name: "Teste Auto Deploy",
  description: "Projeto de teste para validar integração Railway + Cloudflare",
  githubUrl: "https://github.com/lincon-cardoso/portfolio-teste",
  repositoryBranch: "main",
  buildCommand: "npm run build",
  startCommand: "npm start",
  techStack: ["Next.js", "TypeScript", "PostgreSQL"],
  environmentVars: {
    NODE_ENV: "production",
    DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  },
  featured: true,
  customSubdomain: "teste-auto-deploy",
  autoCreateSubdomain: true,
  enableRailwayDeploy: true,
};

async function testAutoDeployAPI() {
  console.log("🧪 Iniciando teste da API Auto-Deploy...\n");

  try {
    console.log("📋 Dados do projeto:");
    console.log(JSON.stringify(testProjectData, null, 2));
    console.log("\n🚀 Enviando requisição...\n");

    const response = await fetch(`${API_BASE}/projects/auto-deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testProjectData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ SUCCESS - Auto-deploy concluído!");
      console.log("\n📊 Resultado:");
      console.log("- Status:", data.success ? "SUCCESS" : "FAILED");
      console.log("- Projeto ID:", data.data.project.id);
      console.log("- Subdomínio:", data.data.subdomain);
      console.log("- URL Final:", data.data.urls.final);
      console.log("- Message:", data.message);

      if (data.data.urls) {
        console.log("\n🌐 URLs geradas:");
        console.log("- Cloudflare:", data.data.urls.cloudflare || "N/A");
        console.log("- Railway:", data.data.urls.railway || "N/A");
      }

      if (data.data.logs && data.data.logs.length > 0) {
        console.log("\n📝 Logs do deploy:");
        data.data.logs.forEach((log) => console.log("  -", log));
      }
    } else {
      console.log("❌ FAILED - Erro no auto-deploy");
      console.log("- Status:", response.status);
      console.log("- Error:", data.error);
      console.log("- Message:", data.message);

      if (data.data && data.data.errors && data.data.errors.length > 0) {
        console.log("\n🚨 Erros encontrados:");
        data.data.errors.forEach((error) => console.log("  -", error));
      }

      if (data.data && data.data.logs && data.data.logs.length > 0) {
        console.log("\n📝 Logs parciais:");
        data.data.logs.forEach((log) => console.log("  -", log));
      }
    }
  } catch (error) {
    console.error("💥 ERRO CRÍTICO no teste:", error.message);
    console.error("Stack trace:", error.stack);
  }
}

async function testProjectsList() {
  console.log("\n\n🧪 Testando listagem de projetos...");

  try {
    const response = await fetch(`${API_BASE}/projects`);
    const data = await response.json();

    if (response.ok) {
      console.log("✅ Projetos listados com sucesso!");
      console.log("- Total de projetos:", data.data.length);

      if (data.data.length > 0) {
        console.log("\n📋 Últimos projetos:");
        data.data.slice(0, 3).forEach((project) => {
          console.log(
            `  - ${project.name} (${project.status}) - ${project.subdomain}`
          );
        });
      }
    } else {
      console.log("❌ Erro ao listar projetos:", data.error);
    }
  } catch (error) {
    console.error("💥 Erro ao testar listagem:", error.message);
  }
}

// Executar testes
async function runTests() {
  console.log("🔧 TESTE COMPLETO DA INTEGRAÇÃO RAILWAY + CLOUDFLARE\n");
  console.log("=".repeat(60));

  // Teste 1: Auto-deploy completo
  await testAutoDeployAPI();

  // Aguardar um pouco
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Teste 2: Listar projetos
  await testProjectsList();

  console.log("\n" + "=".repeat(60));
  console.log("🎉 Testes concluídos!");
  console.log("\nPara verificar os resultados:");
  console.log("1. Verifique o painel Railway: https://railway.app");
  console.log("2. Verifique o painel Cloudflare: https://dash.cloudflare.com");
  console.log("3. Teste o subdomínio criado");
  console.log(
    "4. Verifique o dashboard local: http://localhost:3000/dashboard"
  );
}

// Executar apenas se for chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testAutoDeployAPI,
  testProjectsList,
  runTests,
};
