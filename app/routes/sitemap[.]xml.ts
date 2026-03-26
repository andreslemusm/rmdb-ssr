import type { SitemapRoute } from "@forge42/seo-tools/sitemap"
import { generateSitemap } from "@forge42/seo-tools/sitemap"
import { cacheHeader } from "pretty-cache-header"
import { routes } from "virtual:react-router/server-build"

import { getDomainUrl } from "~/utils/mics.server"

import type { Route } from "./+types/sitemap[.]xml"

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sitemap = await generateSitemap({
    domain: getDomainUrl(request),
    routes: routes as unknown as Array<SitemapRoute>,
  })

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": cacheHeader({
        public: true,
        maxAge: "5m",
        staleWhileRevalidate: "1month",
      }),
    },
  })
}
