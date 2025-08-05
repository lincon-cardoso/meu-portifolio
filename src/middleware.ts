import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = req.nextUrl.host;
  const isLocal = host.includes("localhost");
  const devCsp =
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:3000 wss://localhost:3000;";
  const prodCsp =
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';";
  res.headers.set("Content-Security-Policy", isLocal ? devCsp : prodCsp);

  try {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isProtectedRoute && !isAuth) {
      console.warn(
        "Acesso negado: usuário não autenticado tentando acessar",
        req.nextUrl.pathname
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdminRoute) {
      if (!isAuth || token?.role !== "ADMIN") {
        console.warn(
          "Acesso negado: usuário sem permissão tentando acessar",
          req.nextUrl.pathname
        );
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// aplica somente às rotas de página (não afeta _next/static, _next/image nem favicon)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
