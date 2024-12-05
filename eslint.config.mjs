import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "overrides": [
        {
          files: ["tests/**/*"],
          env: {
            jest: true,
          },
        },
      ],
    },
  },
  pluginJs.configs.recommended,
];
