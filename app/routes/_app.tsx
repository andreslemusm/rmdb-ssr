import { Fragment, useId } from "react"
import { Form, Link, Outlet, useSearchParams } from "react-router"

import {
  BrandIcon,
  GithubIcon,
  LinkedinIcon,
  SearchIcon,
  TwitterXIcon,
  tmdbAltShort,
} from "~/assets/icons"

const Layout = () => {
  const seachInputId = useId()
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query") ?? ""

  return (
    <Fragment>
      <header className="border-b border-neutral-800 px-4 py-6 sm:px-4 sm:py-7 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-8">
            <Link to="/" className="shrink-0" prefetch="intent">
              <span className="sr-only">Home</span>
              <BrandIcon className="block h-10 w-10" />
            </Link>
          </div>
          <Form
            method="get"
            action="/search"
            className="group w-full max-w-xs sm:max-w-md"
            role="search"
          >
            <label htmlFor={seachInputId} className="relative block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon
                  className="h-5 w-5 text-neutral-500 transition-colors ease-out group-focus-within:text-neutral-400"
                  aria-hidden
                />
              </div>
              <input
                id={seachInputId}
                defaultValue={query}
                aria-label="Search movies"
                name="query"
                className="block w-full touch-manipulation rounded-xl border-none bg-neutral-800 py-3 pr-3 pl-10 leading-5 text-neutral-200 placeholder-neutral-500 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:outline-hidden sm:text-sm"
                placeholder="Search your favorite movie…"
                type="search"
                autoComplete="off"
                required
              />
            </label>
          </Form>
        </div>
      </header>
      <div className="px-4 sm:px-4 lg:px-8">
        <main className="mx-auto w-full max-w-7xl overflow-visible">
          <Outlet />
        </main>
      </div>
      <footer className="border-t border-neutral-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:flex md:items-center md:justify-between">
          <nav className="flex justify-center space-x-6 md:order-2">
            {[
              {
                name: "X",
                href: "https://twitter.com/andreslemusm1",
                icon: TwitterXIcon,
              },
              {
                name: "GitHub",
                href: "https://github.com/andreslemusm",
                icon: GithubIcon,
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/andreslemusm",
                icon: LinkedinIcon,
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-500 transition-colors hover:text-neutral-400"
              >
                <item.icon
                  className="h-5 w-5"
                  role="img"
                  aria-label={item.name}
                />
              </a>
            ))}
          </nav>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 font-normal text-neutral-400">
              &copy; {new Date().getFullYear()} Andres Lemus.{" "}
              <a
                href="/"
                className="inline-flex items-baseline gap-x-1 whitespace-nowrap hover:underline"
              >
                Powered by{" "}
                <img
                  src={tmdbAltShort}
                  alt="TMDB API"
                  className="h-3 w-auto"
                  width={300}
                  height={39}
                />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Layout
