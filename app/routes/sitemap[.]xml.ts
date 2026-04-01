import { generateSitemap } from "@forge42/seo-tools/sitemap"
import { cacheHeader } from "pretty-cache-header"
import { getDomainUrl } from "~/utils/mics.server"
import type { Route } from "./+types/sitemap[.]xml"

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sitemap = await generateSitemap({
    domain: getDomainUrl(request),
    routes: [
      // Note: Add all the routes that we want to be indexed by the search engines here.
      { url: "/" },
    ],
  })

  return new Response(sitemap, {
    headers: {
      "Cache-Control": cacheHeader({
        maxAge: "5m",
        public: true,
        staleWhileRevalidate: "1month",
      }),
      "Content-Type": "application/xml",
    },
  })
}
