import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Proxy de autenticação e proteção de rotas (Next.js 16+)

export async function proxy(req: NextRequest) {
  // --- Variáveis de contexto ---
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // Só executa autenticação se necessário
  if (!isLoginPage && !isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // --- Autenticação ---
    const token = await getToken({ req });
    const isAuth = !!token;

    // --- Redirecionamentos ---
    if (isAuth && isLoginPage) {
      // Usuário autenticado tentando acessar login, redireciona para dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isProtectedRoute && !isAuth) {
      // Usuário não autenticado tentando acessar rota protegida
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Acesso negado: usuário não autenticado tentando acessar",
          req.nextUrl.pathname,
        );
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Fluxo padrão: segue para a próxima rota
    return NextResponse.next();
  } catch (error) {
    // --- Tratamento de erro ---
    if (process.env.NODE_ENV === "development") {
      console.error("Erro no proxy de autenticação:", error);
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// --- Matcher de rotas protegidas ---
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
  ],
};
