const purgecss = require("@fullhuman/postcss-purgecss").default;
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      stage: 3,
      features: {
        "custom-properties": false,
      },
    }),
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
