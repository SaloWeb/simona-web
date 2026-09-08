// Flat config (ESLint 9+). Reemplaza al .eslintrc.* que Next ya no soporta
// desde la v9/v10 de ESLint — ver Plan de mejoras, prioridad alta.
// Referencia: https://nextjs.org/docs/app/api-reference/config/eslint
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores de eslint-config-next.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
