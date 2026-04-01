import type { MetaDescriptor } from "react-router"

export const generateMetaTags = ({
  title,
  description,
}: {
  title: string
  description: string
}) =>
  [
    { charSet: "utf-8" },
    { content: "width=device-width, initial-scale=1", name: "viewport" },
    // Primary Meta Tags
    { title },
    { content: title, name: "title" },
    { content: description, name: "description" },
    // Open Graph / Facebook
    { content: "website", property: "og:type" },
    { content: "https://rmdb.andreslemusm.com/", property: "og:url" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    {
      content: "https://rmdb.andreslemusm.com/preview.png",
      property: "og:image",
    },
    // Twitter
    { content: "summary_large_image", property: "twitter:card" },
    { content: "https://rmdb.andreslemusm.com/", property: "twitter:url" },
    { content: title, property: "twitter:title" },
    { content: description, property: "twitter:description" },
    {
      content: "https://rmdb.andreslemusm.com/preview.png",
      property: "twitter:image",
    },
    // Favicons
    { content: title, name: "apple-mobile-web-app-title" },
    { content: title, name: "application-name" },
    { content: "#171717", name: "msapplication-TileColor" },
    { content: "#171717", name: "theme-color" },
  ] satisfies Array<MetaDescriptor>
