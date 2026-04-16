// next.config.js
import dotenv from "dotenv";
dotenv.config();

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// ─── Cabeçalhos de Segurança ─────────────────────────────
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "base-uri 'self';",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com;", // permite Cloudflare
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: https:;",
      "font-src 'self' https: data:;",
      "connect-src 'self' https:;",
      "frame-src 'none';",
      "object-src 'none';",
      "form-action 'self';",
      "frame-ancestors 'none';",
    ].join(" "),
  },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "encrypted-media=()",
      "fullscreen=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "require-corp",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizeCss: true,
  },

  onDemandEntries: {
    maxInactiveAge: isDev ? 0 : 15_000,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(isDev
            ? [
                {
                  key: "Cache-Control",
                  value: "no-store, no-cache, must-revalidate",
                },
                {
                  key: "Pragma",
                  value: "no-cache",
                },
                {
                  key: "Expires",
                  value: "0",
                },
              ]
            : [
                {
                  key: "Cache-Control",
                  value:
                    "public, max-age=0, s-maxage=0, must-revalidate, stale-while-revalidate=60",
                },
              ]),
          ...securityHeaders,
        ],
      },
    ];
  },
};

export default nextConfig;
