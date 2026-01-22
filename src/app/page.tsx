import type { Metadata } from "next";

export default function Home() {
  return (
    <main id="main" role="main">
      Pagina em reconstrução...
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
