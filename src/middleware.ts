import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  let response: NextResponse;
  try {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAuth && isLoginPage) {
      response = NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (isProtectedRoute && !isAuth) {
      console.warn(
        "Acesso negado: usuário não autenticado tentando acessar",
        req.nextUrl.pathname
      );
      response = NextResponse.redirect(new URL("/login", req.url));
    } else if (isAdminRoute) {
      if (!isAuth || token?.role !== "ADMIN") {
        console.warn(
          "Acesso negado: usuário sem permissão tentando acessar",
          req.nextUrl.pathname
        );
        response = NextResponse.redirect(new URL("/", req.url));
      } else {
        response = NextResponse.next();
      }
    } else {
      response = NextResponse.next();
    }
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    response = NextResponse.redirect(new URL("/login", req.url));
  }

  // Ajusta CSP para permitir 'unsafe-eval' apenas em desenvolvimento
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

// aplica somente às rotas de página (não afeta _next/static, _next/image nem favicon)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
