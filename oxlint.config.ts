import { defineConfig } from "oxlint"

export default defineConfig({
  categories: {
    correctness: "error",
    pedantic: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  options: { reportUnusedDisableDirectives: "error", typeAware: true },
  overrides: [{ files: ["tests/**"], plugins: ["vitest"] }],
  plugins: [
    "eslint",
    "import",
    "jsx-a11y",
    "node",
    "oxc",
    "promise",
    "react",
    "typescript",
    "unicorn",
  ],
  // oxlint-disable-next-line sort-keys -- Grouping rules by context.
  rules: {
    // Note: Review rules later when we have a better understanding of the codebase.
    "no-magic-numbers": "off",
    "unicorn/prefer-logical-operator-over-ternary": "off",
    // Note: Add after moving to env.t3.gg and valibot
    "node/no-process-env": "off",
    "typescript/strict-boolean-expressions": "off",
    // Note: Review if it worth enabling these rules.
    "no-undefined": "off",

    "sort-keys": ["error", "asc", { natural: true }],
    "react/jsx-fragments": ["error", "element"],
    "react/jsx-filename-extension": [
      "error",
      { allow: "as-needed", extensions: ["jsx", "tsx"] },
    ],
    "typescript/array-type": ["error", { default: "generic" }],
    "unicorn/text-encoding-identifier-case": ["error", { withDash: true }],
    /**
     * Counting lines, statements, or cyclomatic complexity goes against
     * AHA (Avoid Hasty Abstractions) Programming principles, as we prefer
     * to refactor in response to real pain, not arbitrary thresholds.
     */
    complexity: "off",
    "max-lines": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "react/jsx-max-depth": "off",
    "react/no-multi-comp": "off",
    /**
     * Top-level `import type` is used when only types are needed from a
     * module because of verbatim module syntax enabled, else we use
     * inline `type` imports to avoid redundant module imports.
     */
    "import/consistent-type-specifier-style": "off",
    /**
     * With `experimentalTernaries` enabled in the formatter, ternary operators
     * remain highly readable and idiomatic.
     */
    "no-nested-ternary": "off",
    "no-ternary": "off",
    "unicorn/no-nested-ternary": "off",
    /**
     * `if (!cond)` is often more readable than flipping entire branches,
     * specially with early returns.
     */
    "no-negated-condition": "off",
    /**
     * These features are universally available in both our Node.js and browser
     * environments.
     */
    "oxc/no-async-await": "off",
    "oxc/no-const-enum": "off",
    "oxc/no-optional-chaining": "off",
    "oxc/no-rest-spread-properties": "off",
    // We rely on TypeScript's type system to avoid problems with the rules below.
    "react/jsx-props-no-spreading": "off",
    "typescript/explicit-function-return-type": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/promise-function-async": "off",
    /**
     * Our TypeScript's config ensures `React` is in scope with the
     * `jsx: "react-jsx"` compiler option enabled.
     * See: @link https://www.typescriptlang.org/tsconfig/#jsx
     */
    "react/react-in-jsx-scope": "off",
    // Import order is handled by our formatter (oxfmt).
    "sort-imports": "off",
    // We use `null` for intentionally missing values.
    "unicorn/no-null": "off",

    // Rules specific to React Router framework mode below:

    // Route module exports do not fit these rules.
    "import/max-dependencies": "off",
    "import/no-default-export": "off",
    "import/no-named-export": "off",
    "import/prefer-default-export": "off",
    /**
     * Route module exports manage route exports like action, headers, links, loader,
     * and meta for you.
     * See: @link https://reactrouter.com/explanation/hot-module-replacement#supported-exports
     */
    "react/only-export-components": [
      "error",
      {
        allowExportNames: [
          "middleware",
          "clientMiddleware",
          "loader",
          "clientLoader",
          "action",
          "clientAction",
          "ErrorBoundary",
          "HydrateFallback",
          "headers",
          "handle",
          "links",
          "meta",
          "shouldRevalidate",
        ],
      },
    ],

    // Restrict direct imports in favor of application-level abstractions.
    "eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            importNames: ["Link"],
            message:
              "Import `Link` from `~/components/link` instead of `react-router`.",
            name: "react-router",
          },
        ],
      },
    ],
  },
  settings: {
    "jsx-a11y": { components: { Link: "a" } },
    react: { linkComponents: [{ attributes: ["href"], name: "Link" }] },
  },
})
