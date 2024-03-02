import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { globalLoadingBar } from "./components/global-loading-bar";
import styles from "./tailwind.css?url";
import { useEffect } from "react";
import {
  Links,
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
  // Stylesheets
  { rel: "stylesheet", href: styles },
];

const config = { runtime: "edge" };

const App = () => {
  // Show progress bar on navigation.
  const navigation = useNavigation();
  useEffect(() => {
    // Only show progress bar on normal load.
    if (navigation.state === "loading" && navigation.formData == null) {
      globalLoadingBar.start();
    }
    if (navigation.state === "idle") {
      globalLoadingBar.done();
    }
  }, [navigation.formData, navigation.state]);

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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export { config, links };
export default App;
