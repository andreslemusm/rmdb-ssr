import type { Route } from "./+types/robots[.]txt";
import { cacheHeader } from "pretty-cache-header";
import { generateRobotsTxt } from "@forge42/seo-tools/robots";
import { getDomainUrl } from "~/utils/mics.server";

export const loader = ({ request }: Route.LoaderArgs) => {
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: "*",
      allow: ["/"],
      sitemap: [`${getDomainUrl(request)}/sitemap.xml`],
    },
  ]);

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": cacheHeader({
        public: true,
        maxAge: "5m",
        staleWhileRevalidate: "1month",
      }),
    },
  });
};
