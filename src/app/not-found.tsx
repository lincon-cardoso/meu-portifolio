// src/app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 6000); // 6 segundos reais

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main id="main" role="main" className="page-centered">
      <h1 className="notfound-title">Erro 404</h1>
      <p aria-live="polite" className="notfound-desc">
        Página não encontrada. Você será redirecionado em 6 segundos...
      </p>
      <Link href="/" className="notfound-link">
        Voltar para a página inicial agora
      </Link>
    </main>
  );
}
