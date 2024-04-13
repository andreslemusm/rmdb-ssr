import type { LoaderFunctionArgs } from "@vercel/remix";
import { cacheHeader } from "pretty-cache-header";
import { generateRobotsTxt } from "@nasa-gcn/remix-seo";
import { getDomainUrl } from "~/utils/mics.server";

export const loader = ({ request }: LoaderFunctionArgs) =>
  generateRobotsTxt(
    [{ type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` }],
    {
      headers: {
        "Cache-Control": cacheHeader({
          public: true,
          maxAge: "5m",
          staleWhileRevalidate: "1month",
        }),
      },
    },
  );
