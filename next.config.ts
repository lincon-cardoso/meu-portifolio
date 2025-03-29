import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["your-cdn.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
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
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Rota no front-end
        destination: "http://back-end-portifolio.railway.internal/:path*", // Rota no back-end
      },
    ];
  },
};

export default nextConfig;
