import type { Config } from "@react-router/dev/config"
import { vercelPreset } from "@vercel/react-router/vite"

export default {
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    unstable_optimizeDeps: true,
    unstable_passThroughRequests: true,
    unstable_previewServerPrerendering: true,
    unstable_subResourceIntegrity: true,
    unstable_trailingSlashAwareDataRequests: true,
  },
  presets: [vercelPreset()],
  ssr: true,
} satisfies Config
