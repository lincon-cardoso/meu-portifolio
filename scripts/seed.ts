import { prisma } from "../src/lib/prisma.ts";

async function main() {
  console.log("🌱 Iniciando seed de dados...");

  // Buscar usuário existente
  const user = await prisma.user.findFirst({
    where: { email: "admin@example.com" },
  });

  if (!user) {
    console.error(
      "❌ Usuário não encontrado. Certifique-se de que o usuário já existe no banco de dados."
    );
    process.exit(1);
  }

  console.log("✅ Usuário encontrado:", user);

  // Criar projetos
  const projeto1 = await prisma.projeto.create({
    data: {
      titulo: "Meu Primeiro Projeto",
      descricao: "Este é um projeto de exemplo.",
      tecnologias: ["TypeScript", "Prisma", "PostgreSQL"],
      link: "https://meuprojeto.com",
      linkGithub: "https://github.com/meuprojeto",
      usuarioId: user.id,
    },
  });

  const projeto2 = await prisma.projeto.create({
    data: {
      titulo: "Meu Segundo Projeto",
      descricao: "Outro projeto de exemplo.",
      tecnologias: ["React", "Node.js"],
      link: "https://outroprojeto.com",
      linkGithub: "https://github.com/outroprojeto",
      usuarioId: user.id,
    },
  });

  const projeto3 = await prisma.projeto.create({
    data: {
      titulo: "Projeto de Machine Learning",
      descricao: "Um projeto focado em aprendizado de máquina.",
      tecnologias: ["Python", "TensorFlow", "Keras"],
      link: "https://mlprojeto.com",
      linkGithub: "https://github.com/mlprojeto",
      usuarioId: user.id,
    },
  });

  const projeto4 = await prisma.projeto.create({
    data: {
      titulo: "Aplicativo Mobile",
      descricao: "Aplicativo desenvolvido para dispositivos móveis.",
      tecnologias: ["Flutter", "Dart"],
      link: "https://mobileapp.com",
      linkGithub: "https://github.com/mobileapp",
      usuarioId: user.id,
    },
  });

  const projeto5 = await prisma.projeto.create({
    data: {
      titulo: "API RESTful",
      descricao: "API RESTful para gerenciamento de dados.",
      tecnologias: ["Node.js", "Express", "MongoDB"],
      link: "https://apiprojeto.com",
      linkGithub: "https://github.com/apiprojeto",
      usuarioId: user.id,
    },
  });

  console.log("✅ Projetos criados:", [
    projeto1,
    projeto2,
    projeto3,
    projeto4,
    projeto5,
  ]);
}

main()
  .then(() => {
    console.log("🌱 Seed concluído com sucesso!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao executar seed:", error);
    process.exit(1);
  });
