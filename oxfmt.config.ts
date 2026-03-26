import { defineConfig } from "oxfmt"

export default defineConfig({
  // Tracked but should not be formatted (not in .gitignore).
  ignorePatterns: [".agents"],
  sortTailwindcss: {
    stylesheet: "app/tailwind.css",
    functions: ["clsx", "cn", "cva"],
    attributes: [
      "leave",
      "leaveFrom",
      "leaveTo",
      "enter",
      "enterFrom",
      "enterTo",
    ],
  },
  // https://www.epicweb.dev/your-code-style-does-matter-actually
  printWidth: 80,
  objectWrap: "collapse",
  semi: false,
  sortImports: {},
})
