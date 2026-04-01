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
  { href: styles, rel: "stylesheet" },
  // Favicons
  { href: "/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
  {
    href: "/favicon-32x32.png",
    rel: "icon",
    sizes: "32x32",
    type: "image/png",
  },
  {
    href: "/favicon-16x16.png",
    rel: "icon",
    sizes: "16x16",
    type: "image/png",
  },
  { href: "/site.webmanifest", rel: "manifest" },
  { color: "#5bbad5", href: "/safari-pinned-tab.svg", rel: "mask-icon" },
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
