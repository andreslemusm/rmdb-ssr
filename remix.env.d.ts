/// <reference types="@remix-run/dev" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly TDMB_API_KEY: string;
  }
}

/// <reference types="@vercel/remix/globals" />
