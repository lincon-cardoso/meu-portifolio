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

};

export default nextConfig;
