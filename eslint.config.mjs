// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //base
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
  },

  //browser app files
  {
    files: ["index.js", "public/**/*.js", "src/**/*.browser.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        SpeechSynthesisUtterance: "readonly",
        speechSynthesis: "readonly",
        module: "readonly",
      },
    },
  },

  //configs/scripts
  {
    files: ["eslint.config.{js,mjs}", "jest.config.{js,mjs}", "scripts/**/*.js"],
    languageOptions: { globals: globals.node },
  },

  // tests 
  {
    files: ["test/**/*.{js,mjs,cjs}", "**/*.test.{js,mjs,cjs}"],
    languageOptions: {
      // add browser so window/document are defined
      globals: { ...globals.jest, ...globals.node, ...globals.browser },
      sourceType: "commonjs",
    },
  },
  
  //ignores
  { ignores: ["node_modules/**", "dist/**", "coverage/**"] },
]);
