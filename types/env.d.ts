declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly TMDB_API_KEY: string
    }
  }
}

// Note: Remove after moving to env.t3.gg
// oxlint-disable-next-line unicorn/require-module-specifiers
export {}
