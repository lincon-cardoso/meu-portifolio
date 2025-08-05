import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "@/lib/rateLimit";
import { z } from "zod";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 tentativas
});

const loginSchema = z.object({
  email: z.email("Email inválido."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    // Validação de entrada
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "Erro de validação.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const rateLimitResult = await limiter.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Muitas tentativas de login. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (
      !user ||
      !user.hashedPassword ||
      !(await bcrypt.compare(password, user.hashedPassword))
    ) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 400 }
      );
    }

    // Gerar token ou sessão aqui (exemplo simplificado)
    return NextResponse.json({ redirect: "/dashboard" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
