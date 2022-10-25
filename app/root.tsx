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
  // Favicons
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/safari-pinned-tab.svg",
    color: "#101010",
  },
  // Stylesheets
  { rel: "stylesheet", href: styles },
];

const App = (): React.ReactElement => {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
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
