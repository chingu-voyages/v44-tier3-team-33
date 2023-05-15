module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  singleQuote: false,
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
