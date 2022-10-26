import styles from "./styles/index.output.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
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
    href: "https://use.typekit.net/af/220823/000000000000000000015231/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3",
    rel: "preload",
    type: "font/woff2",
  },
  {
    as: "font",
    crossOrigin: "anonymous",
    href: "https://use.typekit.net/af/180254/00000000000000000001522c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
    rel: "preload",
    type: "font/woff2",
  },
  // Stylesheets
  { rel: "stylesheet", href: styles },
];

const App = (): React.ReactElement => {
  return (
    <html lang="en" className="tk-lato h-full antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export { links, meta };
export default App;
