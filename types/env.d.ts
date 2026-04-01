declare namespace NodeJS {
  export interface ProcessEnv {
    readonly TDMB_API_KEY: string
  }
}

// Note: Remove after moving to env.t3.gg
// oxlint-disable-next-line unicorn/require-module-specifiers
export {}
