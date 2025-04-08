// eslint-disable-next-line @typescript-eslint/no-require-imports
const purgecss = require("@fullhuman/postcss-purgecss");

const isProd = process.env.NODE_ENV === "production";

const config = {
  plugins: [
    ...(isProd
      ? [
          purgecss({
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./app/**/*.{js,ts,jsx,tsx}",
              "./src/hooks/**/*.{js,ts,jsx,tsx}",
              "./src/utils/**/*.{js,ts,jsx,tsx}",
            ],
            css: ["./styles/**/*.scss"],
            safelist: [
              /^fade-/,
              /^btn-/,
              /^nav-/,
              /^MeuPortifolio/,
              /^header-/,
              /^footer-/,
              /^card-/,
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};

module.exports = config; // Exporta o objeto para que o PostCSS possa utilizá-lo
