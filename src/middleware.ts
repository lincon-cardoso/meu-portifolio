import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware de autenticação e proteção de rotas

export async function middleware(req: NextRequest) {
  // --- Variáveis de contexto ---
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // Só executa autenticação se necessário
  if (!isLoginPage && !isProtectedRoute) {
    const response = NextResponse.next();
    // --- Content Security Policy (CSP) ---
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    } else {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    }
    return response;
  }

  try {
    // --- Autenticação ---
    const token = await getToken({ req });
    const isAuth = !!token;

    // --- Redirecionamentos ---
    if (isAuth && isLoginPage) {
      // Usuário autenticado tentando acessar login, redireciona para dashboard
      const response = NextResponse.redirect(new URL("/dashboard", req.url));
      // --- Content Security Policy (CSP) ---
      if (process.env.NODE_ENV === "development") {
        response.headers.set(
          "Content-Security-Policy",
          "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
        );
      } else {
        response.headers.set(
          "Content-Security-Policy",
          "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
        );
      }
      return response;
    }

    if (isProtectedRoute && !isAuth) {
      // Usuário não autenticado tentando acessar rota protegida
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Acesso negado: usuário não autenticado tentando acessar",
          req.nextUrl.pathname
        );
      }
      const response = NextResponse.redirect(new URL("/login", req.url));
      // --- Content Security Policy (CSP) ---
      if (process.env.NODE_ENV === "development") {
        response.headers.set(
          "Content-Security-Policy",
          "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
        );
      } else {
        response.headers.set(
          "Content-Security-Policy",
          "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
        );
      }
      return response;
    }

    // Fluxo padrão: segue para a próxima rota
    const response = NextResponse.next();
    // --- Content Security Policy (CSP) ---
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    } else {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    }
    return response;
  } catch (error) {
    // --- Tratamento de erro ---
    if (process.env.NODE_ENV === "development") {
      console.error("Erro no middleware de autenticação:", error);
    }
    const response = NextResponse.redirect(new URL("/login", req.url));
    // --- Content Security Policy (CSP) ---
    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    } else {
      response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; form-action 'self'; frame-ancestors 'none';"
      );
    }
    return response;
  }
}

// --- Matcher de rotas protegidas ---
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
  ],
};
