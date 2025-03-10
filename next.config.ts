import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Habilita o modo estrito do React para destacar problemas potenciais na aplicação.
  poweredByHeader: false, // Remove o cabeçalho X-Powered-By para melhorar a segurança.
  compress: true, // Habilita a compressão gzip para melhorar a performance.
  experimental: {
    scrollRestoration: true, // Habilita a restauração de rolagem experimental para melhorar a experiência do usuário.
  },
  // Otimização de imagens
  images: {
    formats: ["image/avif", "image/webp"], // Suporte para formatos modernos de imagem para melhor compressão.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tamanhos de dispositivo para imagens responsivas.
  },
  // Configuração para recursos estáticos
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache de longo prazo para recursos estáticos.
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/fonts/:path*",
        destination: "/_next/static/fonts/:path*", // Reescrita de URL para servir fontes estáticas.
      },
    ];
  },
};

export default nextConfig;
