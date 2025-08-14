import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]), // esto va como primer elemento o fuera del array
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      "plugin:react-hooks/recommended", // si tienes eslint-plugin-react-hooks instalado
      "plugin:react-refresh/recommended", // si existe, o la config que uses
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
]);
