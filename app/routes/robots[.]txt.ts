import { generateRobotsTxt } from "@forge42/seo-tools/robots"
import { cacheHeader } from "pretty-cache-header"
import { getDomainUrl } from "~/utils/mics.server"
import type { Route } from "./+types/robots[.]txt"

export const loader = ({ request }: Route.LoaderArgs) => {
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: "*",
      allow: ["/"],
      sitemap: [`${getDomainUrl(request)}/sitemap.xml`],
    },
  ])

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": cacheHeader({
        public: true,
        maxAge: "5m",
        staleWhileRevalidate: "1month",
      }),
    },
  })
}
