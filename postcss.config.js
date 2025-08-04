// postcss.config.js
const config = {
  plugins: {
    // Corrige bugs conhecidos do Flexbox em alguns navegadores antigos
    "postcss-flexbugs-fixes": {},

    // Permite usar recursos modernos de CSS e faz fallback automaticamente
    "postcss-preset-env": {
      stage: 1, // Permite features mais modernas ainda (como nesting nativo)
      autoprefixer: {
        flexbox: "no-2009",
        grid: true, // Suporte a CSS Grid para navegadores antigos
      },
      features: {
        "custom-properties": true,
        "nesting-rules": true,
      },
    },

    // Remove comentários e minifica CSS em produção
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "default",
          },
        }
      : {}),
  },
};

export default config;
