import "@/style/style.scss";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

const cloudflareInsightsToken = process.env.CLOUDFLARE_INSIGHTS_TOKEN;

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
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Lincon Cardoso",
    description: "Desenvolvedor Front-End com projetos de impacto visual real.",
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
      <head>
        {cloudflareInsightsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${cloudflareInsightsToken}"}`}
          ></script>
        )}
        {/* Structured data (JSON-LD) para SEO básico */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Portfólio | Lincon Cardoso",
              url: "https://www.devlincon.com.br",
              author: { "@type": "Person", name: "Lincon Cardoso" },
            }),
          }}
        />
      </head>
      <body>
        {/* Skip link: acessível para usuários de teclado/leitores de tela */}
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
