import React from "react";
import "@/style/style.scss";
import TesteBackEnd from "../components/TesteBackEnd"; // Importa o componente de teste

export const metadata = {
  title: "Meu Portfólio Pessoal",
  description: "Portfólio de Lincon Cardoso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body>
        <TesteBackEnd /> {/* Adiciona o componente de teste */}
        {children}
      </body>
    </html>
  );
}
