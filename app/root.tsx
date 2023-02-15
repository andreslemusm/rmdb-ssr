import type { LinksFunction } from "@remix-run/node";
import NProgress from "nprogress";
import { json } from "@remix-run/node";
import styles from "./styles/index.output.css";
import { useEffect } from "react";
import { usePostHog } from "./utils/posthog";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

const shouldRevalidate = () => false;

const loader = () =>
  json(
    {
      ENV: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=10, stale-while-revalidate=31536000",
      },
    }
  );

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

const App = () => {
  const { ENV } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  // Show loading bar on every page navigation
  useEffect(() => {
    if (navigation.state === "idle") NProgress.done();
    else NProgress.start();
  }, [navigation.state]);

  usePostHog();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col bg-neutral-900">
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export { shouldRevalidate, links, loader };
export default App;
