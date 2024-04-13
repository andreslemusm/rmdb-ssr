import { cacheHeader } from "pretty-cache-header";
import { generateSitemap } from "@nasa-gcn/remix-seo";
import { getDomainUrl } from "~/utils/mics.server";
// @ts-expect-error -- This is the way to import routes from the server-build in Vite
import { routes } from "virtual:remix/server-build";
import type { LoaderFunctionArgs, ServerBuild } from "@vercel/remix";

export const loader = async ({ request }: LoaderFunctionArgs) =>
  generateSitemap(request, routes as ServerBuild["routes"], {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": cacheHeader({
        public: true,
        maxAge: "5m",
        staleWhileRevalidate: "1month",
      }),
    },
  });
