/* eslint-disable import/group-exports, import/exports-last
  --
  Vercel's config requires to be exported on its own, so we can't group all the exports together.
*/
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { globalLoadingBar } from "./components/global-loading-bar";
import styles from "./tailwind.css?url";
import { Fragment, useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";

export const config = { runtime: "edge" };

const links: LinksFunction = () => [
  // Stylesheets
  { rel: "stylesheet", href: styles },
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
];

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="h-full antialiased">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="flex h-full flex-col bg-neutral-900">
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

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
    <Fragment>
      <Outlet />
      <SpeedInsights />
      <Analytics />
    </Fragment>
  );
};

export { Layout, links };
export default App;
