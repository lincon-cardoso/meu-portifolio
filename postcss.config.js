// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require("@fullhuman/postcss-purgecss").default;

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
            safelist: [/^fade-/, /^btn-/, /^nav-/, /^MeuPortifolio/],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
