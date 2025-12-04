import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Proxy de autenticação e proteção de rotas (Next.js 16+)

// Helper para aplicar CSP headers
function applyCSPHeaders(response: NextResponse): NextResponse {
  const isDev = process.env.NODE_ENV === "development";
  const csp = isDev
    ? "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
    : "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';";

  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export async function proxy(req: NextRequest) {
  // --- Variáveis de contexto ---
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // Só executa autenticação se necessário
  if (!isLoginPage && !isProtectedRoute) {
    return applyCSPHeaders(NextResponse.next());
  }

  try {
    // --- Autenticação ---
    const token = await getToken({ req });
    const isAuth = !!token;

    // --- Redirecionamentos ---
    if (isAuth && isLoginPage) {
      // Usuário autenticado tentando acessar login, redireciona para dashboard
      return applyCSPHeaders(
        NextResponse.redirect(new URL("/dashboard", req.url))
      );
    }

    if (isProtectedRoute && !isAuth) {
      // Usuário não autenticado tentando acessar rota protegida
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Acesso negado: usuário não autenticado tentando acessar",
          req.nextUrl.pathname
        );
      }
      return applyCSPHeaders(NextResponse.redirect(new URL("/login", req.url)));
    }

    // Fluxo padrão: segue para a próxima rota
    return applyCSPHeaders(NextResponse.next());
  } catch (error) {
    // --- Tratamento de erro ---
    if (process.env.NODE_ENV === "development") {
      console.error("Erro no proxy de autenticação:", error);
    }
    return applyCSPHeaders(NextResponse.redirect(new URL("/login", req.url)));
  }
}

// --- Matcher de rotas protegidas ---
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
  ],
};
