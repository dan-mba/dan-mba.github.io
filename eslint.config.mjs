import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import js from "@eslint/js";

export default [
  {
    ignores: ["public/**/*",".cache/**/*"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-extra-semi": 0,
      "react/jsx-uses-react": 'off',
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 'off',
    },
  }
];