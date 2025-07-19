/**
 * TESTE SIMPLES PARA AS APIs CRUD DE PROJETOS
 * Execute: node scripts/test-api.js
 */

const API_BASE = "http://localhost:3000/api";

async function testAPI() {
  console.log("🧪 Testando APIs CRUD de Projetos...\n");

  try {
    // 1. Listar projetos
    console.log("1️⃣ Testando GET /api/projects");
    const listResponse = await fetch(`${API_BASE}/projects`);
    const listData = await listResponse.json();
    console.log("✅ Listagem:", listData.success ? "OK" : "ERRO");
    console.log(`📊 Total de projetos: ${listData.count}\n`);

    // 2. Buscar projeto específico (usar ID do primeiro projeto)
    if (listData.data && listData.data.length > 0) {
      const projectId = listData.data[0].id;
      console.log("2️⃣ Testando GET /api/projects/[id]");
      const getResponse = await fetch(`${API_BASE}/projects/${projectId}`);
      const getData = await getResponse.json();
      console.log("✅ Busca por ID:", getData.success ? "OK" : "ERRO");
      console.log(`📋 Projeto: ${getData.data?.name}\n`);
    }

    // 3. Criar novo projeto
    console.log("3️⃣ Testando POST /api/projects");
    const newProject = {
      name: "Projeto Teste API",
      description: "Projeto criado via teste de API",
      githubUrl: "https://github.com/lincon-cardoso/projeto-teste",
      subdomain: "projeto-teste-api",
      repositoryBranch: "main",
      buildCommand: "npm run build",
      techStack: ["Next.js", "TypeScript", "Jest"],
      featured: false,
    };

    const createResponse = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    const createData = await createResponse.json();
    console.log("✅ Criação:", createData.success ? "OK" : "ERRO");
    if (createData.success) {
      console.log(`📋 Projeto criado: ${createData.data.name}`);
      const createdId = createData.data.id;

      // 4. Atualizar projeto criado
      console.log("\n4️⃣ Testando PUT /api/projects/[id]");
      const updateData = {
        name: "Projeto Teste API - Atualizado",
        featured: true,
      };

      const updateResponse = await fetch(`${API_BASE}/projects/${createdId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const updateResult = await updateResponse.json();
      console.log("✅ Atualização:", updateResult.success ? "OK" : "ERRO");
      console.log(`📋 Nome atualizado: ${updateResult.data?.name}`);

      // 5. Deletar projeto criado
      console.log("\n5️⃣ Testando DELETE /api/projects/[id]");
      const deleteResponse = await fetch(`${API_BASE}/projects/${createdId}`, {
        method: "DELETE",
      });

      const deleteResult = await deleteResponse.json();
      console.log("✅ Deleção:", deleteResult.success ? "OK" : "ERRO");
    } else {
      console.log("❌ Erro na criação:", createData.error);
      if (createData.details) {
        console.log("📋 Detalhes:", createData.details);
      }
    }

    console.log("\n🎉 Teste das APIs CRUD concluído!");
  } catch (error) {
    console.error("❌ Erro no teste:", error.message);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
