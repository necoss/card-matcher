 
import js from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
// @ts-ignore
import reactUseEffect from "eslint-plugin-react-useeffect"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist/**", "build/**", ".react-router/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs.flat["recommended-latest"],

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "react-useeffect": reactUseEffect,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true }],
      "react-useeffect/no-non-function-return": "error",
      "simple-import-sort/exports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/jsx-key": "warn",
      "react-hooks/exhaustive-deps": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^@eslint", "^eslint", "^globals", "^typescript", "^react", "^react-dom", "^react-router", "^lucide-react", "^react-hook-form", "^react-day-picker", "^clsx", "^tailwind-merge", "^date-fns", "^valibot", "^ky", "^@hapi"],

            ["^@?\\w"],

            // todo 4
            ["^(@|src)(/.*|$)"],

            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
)
