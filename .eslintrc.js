module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-vars": "error",
    "vue/attributes-order": true,
    semi: [2, "always"],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    quotes: [
      "error",
      "single",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["if", "for", "while", "switch"],
      },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      { blankLine: "always", prev: "*", next: ["const", "let"] },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["export", "const", "let"],
      },
    ],
  },
};
