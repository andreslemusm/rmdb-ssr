import { defineConfig } from "oxfmt"

export default defineConfig({
  ignorePatterns: [".agents"],
  objectWrap: "collapse",
  printWidth: 80,
  semi: false,
  sortImports: { newlinesBetween: false },
  sortPackageJson: { sortScripts: true },
  sortTailwindcss: {
    attributes: [
      "leave",
      "leaveFrom",
      "leaveTo",
      "enter",
      "enterFrom",
      "enterTo",
    ],
    functions: ["clsx", "cn", "cva"],
    stylesheet: "app/tailwind.css",
  },
})
