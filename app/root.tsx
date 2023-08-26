import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import NProgress from "nprogress";
import styles from "./tailwind.css";
import { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";

const links: LinksFunction = () => [
  // Favicons
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
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
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
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

NProgress.configure({
  easing: "linear",
  minimum: 0.1,
  showSpinner: false,
  trickleSpeed: 100,
});

const config = { runtime: "edge" };

const App = () => {
  const navigation = useNavigation();

  // Show loading bar on every page navigation
  useEffect(() => {
    if (navigation.state === "idle") NProgress.done();
    else NProgress.start();
  }, [navigation.state]);

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col bg-neutral-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
};

export { config, links };
export default App;
