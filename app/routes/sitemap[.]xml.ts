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
      "Content-Type": "application/xml",
      "Cache-Control": cacheHeader({
        public: true,
        maxAge: "5m",
        staleWhileRevalidate: "1month",
      }),
    },
  })
}
