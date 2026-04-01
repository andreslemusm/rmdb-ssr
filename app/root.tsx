import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Fragment, useEffect } from "react"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router"
import type { Route } from "./+types/root"
import { globalLoadingBar } from "./components/global-loading-bar"
import styles from "./tailwind.css?url"

const links: Route.LinksFunction = () => [
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
]

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
)

const App = () => {
  // Show progress bar on navigation.
  const navigation = useNavigation()
  useEffect(() => {
    // Only show progress bar on normal load.
    if (navigation.state === "loading" && navigation.formData === undefined) {
      globalLoadingBar.start()
    }
    if (navigation.state === "idle") {
      globalLoadingBar.done()
    }
  }, [navigation.formData, navigation.state])

  return (
    <Fragment>
      <Outlet />
      <SpeedInsights />
      <Analytics />
    </Fragment>
  )
}

export { Layout, links }
export default App
