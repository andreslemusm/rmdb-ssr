import { defineConfig } from "vite";
// eslint-disable-next-line no-restricted-imports -- Only way to install node polyfills
import { installGlobals } from "@remix-run/node";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";
import { visualizer } from "rollup-plugin-visualizer";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
    // `emitFile` is necessary since Remix builds more than one bundle!
    visualizer({ emitFile: true }),
  ],
});
