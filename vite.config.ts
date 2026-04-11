import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
    // `emitFile` is necessary since RR builds more than one bundle!
    visualizer({ emitFile: true }),
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
})
