import purgecss from "@fullhuman/postcss-purgecss";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    // PurgeCSS só roda em produção
    ...(isProd
      ? [
          purgecss({
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./app/**/*.{js,ts,jsx,tsx}",
            ],
            css: ["./styles/**/*.scss"], // Ajuste conforme onde estão seus arquivos SCSS
            safelist: [
              /^fade-/,
              /^btn-/,
              /^nav-/,
              /^icon/,
              /^section/,
              /^card/,
              /^MeuPortifolio/, // por segurança com seus componentes
              // Adicione aqui outras classes que você usa com JS dinâmico
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
