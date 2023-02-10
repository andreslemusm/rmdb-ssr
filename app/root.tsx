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

export { shouldRevalidate, links, meta, loader };
export default App;
