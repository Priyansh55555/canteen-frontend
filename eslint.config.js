import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],

    plugins: {
      react,
    },

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
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
      // Catch variables/components used but not imported
      "no-undef": "error",
      
      // Catch imports that aren't being used (Remove the IgnorePattern!)
      "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }],
      
      // Bridge for JSX
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
    }
  },
]);