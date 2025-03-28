import React, { useEffect } from "react";
import "@/style/style.scss";

export const metadata = {
  title: "Meu Portfólio Pessoal",
  description: "Portfólio de Lincon Cardoso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Chamada de teste ao back-end
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teste`)
      .then((res) => res.json())
      .then((data) => console.log("Resposta do back-end:", data))
      .catch((err) => console.error("Erro de conexão com o back-end:", err));
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Adicionar Favicon */}
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
