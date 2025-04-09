module.exports = {
  plugins: {
    // Corrige bugs conhecidos do Flexbox em navegadores antigos
    "postcss-flexbugs-fixes": {},

    // Permite utilizar recursos modernos do CSS com fallback e autoprefixer
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    },

    // Em produção, minifica o CSS para reduzir o tamanho e melhorar a performance
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "default",
          },
        }
      : {}),
  },
};
