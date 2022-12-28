import { ConditionalScrollRestoration } from "./components/conditional-scroll-restoration";
import styles from "./styles/index.output.css";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

const meta: MetaFunction = () => ({
  charSet: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  // Primary Meta Tags
  title: "React Movie Database (RMDB)",
  description:
    "Find everything you want to know of your favorite movies and TV shows",
  //  Open Graph / Facebook
  "og:type": "website",
  "og:url": "https://rmdb.andreslemus.dev/",
  "og:title": "React Movie Database (RMDB)",
  "og:description":
    "Find everything you want to know of your favorite movies and TV shows",
  "og:image": "/preview.png",
  // Colors
  "theme-color": "#ffffff",
  "msapplication-TileColor": "#ffffff",
});

const links: LinksFunction = () => [
  /*
   * Favicons
   * {
   *   rel: "apple-touch-icon",
   *   sizes: "180x180",
   *   href: "/apple-touch-icon.png",
   * },
   * {
   *   rel: "icon",
   *   type: "image/png",
   *   sizes: "32x32",
   *   href: "/favicon-32x32.png",
   * },
   * {
   *   rel: "icon",
   *   type: "image/png",
   *   sizes: "16x16",
   *   href: "/favicon-16x16.png",
   * },
   * { rel: "manifest", href: "/site.webmanifest" },
   * {
   *   rel: "mask-icon",
   *   href: "/safari-pinned-tab.svg",
   *   color: "#101010",
   * },
   */
  // Lato 400, 700
  {
    as: "font",
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2",
    rel: "preload",
    type: "font/woff2",
  },
  {
    as: "font",
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2",
    rel: "preload",
    type: "font/woff2",
  },
  // Stylesheets
  { rel: "stylesheet", href: styles },
];

const App = () => (
  <html lang="en" className="h-full antialiased">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="flex h-full flex-col bg-neutral-900">
      <Outlet />
      <ConditionalScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export { links, meta };
export default App;
