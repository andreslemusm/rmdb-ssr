/// <reference types="vite/client" />

/// <reference types="@vercel/remix" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly TDMB_API_KEY: string;
  }
}
