const typescriptEslint = require("@typescript-eslint/eslint-plugin")
const tsParser = require("@typescript-eslint/parser")
const js = require("@eslint/js")

const {
  FlatCompat,
} = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = [{
  ignores: [
    ".next",
    "**/node_modules",
    "eslint.config.cjs"
  ],
}, ...compat.extends(
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "prettier",
  "next/core-web-vitals",
), {
  plugins: {
    "@typescript-eslint": typescriptEslint,
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  }
}, {
  files: ["**/*.js"],

  rules: {
    "@typescript-eslint/no-require-imports": "off",
  },
}, {
  files: ["**/seed.ts"],

  rules: {
    "@typescript-eslint/no-require-imports": "off",
  },
}, {
  files: [
    "components/defaultLanding/**/*.tsx",
    "components/emailTemplates/**/*.tsx",
    "pages/index.tsx",
  ],
}];
