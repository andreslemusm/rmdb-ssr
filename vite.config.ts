import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
    // `emitFile` is necessary since RR builds more than one bundle!
    visualizer({ emitFile: true }),
  ],
})
