import { forwardRef } from "react"
// oxlint-disable-next-line no-restricted-imports -- Here's our abstraction implementation.
import { Link as RRLink, type LinkProps as RRLinkProps } from "react-router"

const Link = forwardRef<
  HTMLAnchorElement,
  Omit<RRLinkProps, "to"> & { href: RRLinkProps["to"] }
>(({ href, ...props }, ref) => <RRLink ref={ref} to={href} {...props} />)
if (import.meta.env.DEV) {
  Link.displayName = "Link"
}

export { Link }
