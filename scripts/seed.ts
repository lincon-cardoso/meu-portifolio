import { prisma } from "../src/lib/prisma.ts";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Iniciando seed de dados...");

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: "novo.admin@example.com" },
  });

  if (existingUser) {
    console.log("⚠️ Usuário ADMIN já existe no banco de dados:", existingUser);
    return;
  }

  // Criar um novo usuário com senha criptografada
  const hashedPassword = await bcrypt.hash("senhaAdminNova123", 10);

  const usuario = await prisma.user.create({
    data: {
      name: "Novo Administrador",
      email: "novo.admin@example.com",
      hashedPassword,
      role: "ADMIN", // Definindo o papel como ADMIN
    },
  });

  console.log("✅ Novo usuário ADMIN criado:", usuario);
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
