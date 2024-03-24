import type { LoaderFunctionArgs } from "@vercel/remix";
import { generateRobotsTxt } from "@nasa-gcn/remix-seo";
import { getDomainUrl } from "~/utils/mics.server";

export const loader = ({ request }: LoaderFunctionArgs) =>
  generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` },
  ]);
