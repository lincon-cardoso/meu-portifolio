import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-cdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // Suporte a formatos modernos de imagem
  },

  experimental: {
    serverActions: {}, // ativado corretamente
    turbo: {}, // turbo ativado corretamente
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          }, // Cache de 1 ano
        ],
      },
    ];
  },
};

export default nextConfig;
