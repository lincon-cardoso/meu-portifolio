import "@/style/style.scss";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Portfólio | Lincon Cardoso",
  description:
    "Desenvolvedor Front-End com foco em UI/UX, React e Next.js. Veja meus projetos em destaque e entre em contato!",
  metadataBase: new URL("https://www.devlincon.com.br"),
  alternates: {
    canonical: "https://www.devlincon.com.br/",
  },
  openGraph: {
    title: "Portfólio | Lincon Cardoso",
    description:
      "Projetos profissionais com foco em design moderno, performance e acessibilidade.",
    url: "https://www.devlincon.com.br",
    siteName: "Dev Lincon",
    images: [
      {
        url: "/img/Foto.jpg",
        width: 1200,
        height: 630,
        alt: "Preview do site de Lincon Cardoso",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Lincon Cardoso",
    description: "Desenvolvedor Front-End com projetos de impacto visual real.",
    images: ["/img/Foto.jpg"],
    creator: "@seuUsuarioTwitter",
  },
  icons: {
    icon: "/icons/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
