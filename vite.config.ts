import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
    // `emitFile` is necessary since RR builds more than one bundle!
    visualizer({ emitFile: true }),
  ],
});
