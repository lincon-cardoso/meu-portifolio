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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 id="error-title" style={{ fontSize: "2rem", color: "#333" }}>
        Ocorreu um erro inesperado
      </h1>
      <p
        id="error-description"
        style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1rem" }}
        aria-live="polite"
      >
        Algo deu errado no servidor. Por favor, tente novamente.
      </p>
      <button
        onClick={() => reset()}
        aria-label="Tentar novamente"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#0070f3",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Tentar Novamente
      </button>
    </div>
  );
}
