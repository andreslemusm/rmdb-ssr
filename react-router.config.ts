import type { Config } from "@react-router/dev/config"
import { vercelPreset } from "@vercel/react-router/vite"

export default {
  future: {
    unstable_optimizeDeps: true,
    unstable_previewServerPrerendering: true,
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: "enforce",
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
  presets: [vercelPreset()],
  ssr: true,
  subResourceIntegrity: true,
} satisfies Config
