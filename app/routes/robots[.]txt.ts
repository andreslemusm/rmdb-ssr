import { generateRobotsTxt } from "@forge42/seo-tools/robots"
import { cacheHeader } from "pretty-cache-header"
import { getDomainUrl } from "~/utils/mics.server"
import type { Route } from "./+types/robots[.]txt"

export const loader = ({ request }: Route.LoaderArgs) => {
  const robotsTxt = generateRobotsTxt([
    {
      allow: ["/"],
      sitemap: [`${getDomainUrl(request)}/sitemap.xml`],
      userAgent: "*",
    },
  ])

  return new Response(robotsTxt, {
    headers: {
      "Cache-Control": cacheHeader({
        maxAge: "5m",
        public: true,
        staleWhileRevalidate: "1month",
      }),
      "Content-Type": "text/plain",
    },
  })
}
