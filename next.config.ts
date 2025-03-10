import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Habilita o modo estrito do React para destacar problemas potenciais na aplicação.
  poweredByHeader: false, // Remove o cabeçalho X-Powered-By para melhorar a segurança.
  compress: true, // Habilita a compressão gzip para melhorar a performance.
  experimental: {
    scrollRestoration: true, // Habilita a restauração de rolagem experimental para melhorar a experiência do usuário.
  },
  async rewrites() {
    return [
      {
        source: "/fonts/:path*",
        destination: "/_next/static/fonts/:path*",
      },
    ];
  },
};

export default nextConfig;
