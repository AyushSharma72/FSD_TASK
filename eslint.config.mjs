// eslint.config.js
import next from "eslint-plugin-next";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    plugins: {
      next: next,
    },
    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },
];
