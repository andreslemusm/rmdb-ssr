import type { MetaDescriptor } from "@vercel/remix";

export const generateMetaTags = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) =>
  [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Primary Meta Tags
    { title },
    { name: "title", content: title },
    {
      name: "description",
      content: description,
    },
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rmdb.andreslemusm.com/" },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: "https://rmdb.andreslemusm.com/preview.png",
    },
    // Twitter
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: "https://rmdb.andreslemusm.com/" },
    { property: "twitter:title", content: title },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: "https://rmdb.andreslemusm.com/preview.png",
    },
    // Favicons
    {
      name: "apple-mobile-web-app-title",
      content: title,
    },
    { name: "application-name", content: title },
    { name: "msapplication-TileColor", content: "#2d89ef" },
    { name: "theme-color", content: "#ffffff" },
  ] satisfies Array<MetaDescriptor>;
