// src/app/layout.tsx
import React from "react";
import "@/style/style.scss";

export const metadata = {
  title: "Meu Portfólio Pessoal",
  description: "Portfólio de Lincon Cardoso",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/icons/favicon.ico" />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}