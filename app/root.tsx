import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/index.output.css";

const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const Root = (): React.ReactElement => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="bg-zinc-800 antialiased">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export { links, meta };
export default Root;
