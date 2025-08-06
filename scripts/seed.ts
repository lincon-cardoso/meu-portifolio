import { prisma } from "../src/lib/prisma.ts";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpar dados existentes para evitar duplicatas
  await prisma.projeto.deleteMany({});
  await prisma.user.deleteMany({});

  // Criar um usuário administrador
  const hashedPassword = await bcrypt.hash("senha123", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Administrador",
      hashedPassword: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`👤 Usuário administrador criado com ID: ${adminUser.id}`);

  // Criar categorias
  const categorias = [
    { category: "financeiro", label: "Financeiro" },
    { category: "comercial", label: "Comercial" },
    { category: "dashboard-admin", label: "Dashboard/Admin" },
    { category: "landing-page", label: "Landing Page" },
    { category: "blog", label: "Blog" },
    { category: "educacao", label: "Educação" },
    { category: "delivery", label: "Delivery" },
    { category: "pessoal", label: "Pessoal" },
  ];

  // Criar 4 projetos para cada categoria
  const projetos = categorias.flatMap((categoria) =>
    Array.from({ length: 4 }, (_, index) => ({
      titulo: `Projeto ${categoria.label} ${index + 1}`,
      descricao: `Descrição do projeto ${categoria.label} ${index + 1}.`,
      imagem: `https://via.placeholder.com/300x200?text=${encodeURIComponent(
        categoria.label
      )}+${index + 1}`,
      category: categoria.category,
      tecnologias: ["React", "Next.js", "TypeScript", "Prisma"],
      link: `https://exemplo.com/projeto-${categoria.category}-${index + 1}`,
      linkGithub: `https://github.com/seu-usuario/projeto-${categoria.category}-${index + 1}`,
      usuarioId: adminUser.id,
      destaque: index % 2 === 0, // Alterna entre destaque e não destaque
    }))
  );

  // Inserir os projetos no banco de dados
  for (const projeto of projetos) {
    await prisma.projeto.create({
      data: projeto,
    });
  }

  console.log(`✅ ${projetos.length} projetos criados com sucesso!`);
}

main()
  .then(() => {
    console.log("🌱 Seed finalizado!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao executar seed:", error);
    process.exit(1);
  });
