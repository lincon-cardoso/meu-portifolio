import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = req.nextUrl.host;
  const isLocal = host.includes("localhost");
  const devCsp =
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:3000 wss://localhost:3000;";
  const prodCsp =
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';";
  res.headers.set("Content-Security-Policy", isLocal ? devCsp : prodCsp);
  return res;
}

// aplica somente às rotas de página (não afeta _next/static, _next/image nem favicon)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
