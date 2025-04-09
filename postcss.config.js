const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
    ...(isProd
      ? {
          "@fullhuman/postcss-purgecss": {
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./app/**/*.{js,ts,jsx,tsx}",
            ],
            css: ["./styles/**/*.scss"],
            safelist: [/^fade-/, /^btn-/, /^nav-/, /^MeuPortifolio/],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          },
        }
      : {}),
  },
};
