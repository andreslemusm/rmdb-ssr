import type { KnipConfig } from "knip"

const config = {
  ignoreDependencies: [
    // We use it in package.json's `config.commitizen.path`.
    "cz-conventional-changelog",
  ],
  tags: ["-lintignore"],
} satisfies KnipConfig

export default config
