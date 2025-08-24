// src/app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Logar o erro em um serviço de reporting
    console.error(error);
  }, [error]);

  return (
    <div
      role="alertdialog"
      aria-labelledby="error-title"
      aria-describedby="error-description"
      className="page-centered"
    >
      <h1 id="error-title" className="error-title">
        Ocorreu um erro inesperado
      </h1>
      <p
        id="error-description"
        className="error-description"
        aria-live="polite"
      >
        Algo deu errado no servidor. Por favor, tente novamente.
      </p>
      <button
        onClick={() => reset()}
        aria-label="Tentar novamente"
        className="error-button"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
