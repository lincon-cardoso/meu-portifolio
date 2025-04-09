import purgecss from "@fullhuman/postcss-purgecss";

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    ...(isProd
      ? [
          purgecss({
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./app/**/*.{js,ts,jsx,tsx}",
            ],
            css: ["./styles/**/*.scss"],
            safelist: [/^fade-/, /^btn-/, /^nav-/, /^MeuPortifolio/],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
