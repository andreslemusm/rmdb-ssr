import { Fragment } from "react";
import {
  BrandIcon,
  GithubIcon,
  LinkedinIcon,
  SearchIcon,
  TwitterXIcon,
  tmdbAltShort,
} from "~/assets/icons";
import { Form, Link, Outlet, useSearchParams } from "react-router";

const Layout = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

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
            className="w-full max-w-xs sm:max-w-md"
          >
            <label htmlFor="search" className="relative block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon
                  className="h-5 w-5 text-neutral-400"
                  role="img"
                  aria-label="Search"
                />
              </div>
              <input
                defaultValue={query}
                name="query"
                className="block w-full rounded-xl border border-transparent bg-neutral-800 py-2 pr-3 pl-10 leading-5 text-neutral-200 placeholder-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:ring-3 focus:ring-neutral-700 focus:outline-hidden sm:text-sm"
                placeholder="Search your favorite movie..."
                type="search"
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
  );
};

export default Layout;
