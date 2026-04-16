import type { Metadata } from "next";

export default function Home() {
  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(135deg, rgb(244, 247, 251) 0%, rgb(227, 237, 247) 100%)",
  } as const;

  const cardStyle = {
    maxWidth: "560px",
    padding: "40px 32px",
    borderRadius: "24px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
  } as const;

  const badgeStyle = {
    display: "inline-block",
    marginBottom: "16px",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "rgb(30, 64, 175)",
    backgroundColor: "rgb(219, 234, 254)",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    lineHeight: 1.1,
    color: "rgb(15, 23, 42)",
  };

  const textStyle = {
    margin: "16px 0 0",
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "rgb(71, 85, 105)",
  };

  return (
    <main id="main" role="main" style={mainStyle}>
      <section style={cardStyle} aria-labelledby="construction-title">
        <span style={badgeStyle}>Atualização em andamento</span>
        <h1 id="construction-title" style={titleStyle}>
          Página em construção
        </h1>
        <p style={textStyle}>
          Estou reorganizando esta área do portfólio para publicar uma versão
          mais completa, com projetos, serviços e formas de contato em breve.
        </p>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Portfólio | Lincon Cardoso",
  description:
    "Desenvolvedor Front-End. Veja projetos, serviços e entre em contato com Lincon Cardoso.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portfólio | Lincon Cardoso",
    description:
      "Projetos profissionais com foco em design, performance e acessibilidade.",
    url: "https://www.devlincon.com.br/",
    siteName: "Dev Lincon",
    images: [
      {
        url: "/img/Foto.jpg",
        alt: "Foto de Lincon Cardoso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Lincon Cardoso",
    description: "Desenvolvedor Front-End com projetos de impacto visual.",
  },
};
