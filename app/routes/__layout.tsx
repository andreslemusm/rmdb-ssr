import { Fragment } from "react";
import { Search } from "lucide-react";
import { BrandIcon, tmdbAltShort } from "~/assets/icons";
import { Form, Link, Outlet, useSearchParams } from "@remix-run/react";
import {
  Sigithub,
  Silinkedin,
  Sitwitter,
} from "@icons-pack/react-simple-icons";

const Layout = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return (
    <Fragment>
      <header className="border-b border-neutral-800 px-4 py-6 sm:py-7 sm:px-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-8">
            <Link to="/" className="flex-shrink-0" prefetch="intent">
              <span className="sr-only">Home</span>
              <BrandIcon className="block h-10 w-10" />
            </Link>
          </div>
          <Form action="/search" className="w-full max-w-xs sm:max-w-md">
            <label htmlFor="search" className="relative block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search
                  className="h-5 w-5 text-neutral-400"
                  aria-label="Search"
                />
              </div>
              <input
                defaultValue={query}
                name="query"
                className="block w-full rounded-xl border border-transparent bg-neutral-800 py-2 pl-10 pr-3 leading-5 text-neutral-200 placeholder-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none focus:ring-neutral-700 sm:text-sm"
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
      <footer className="border-t border-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl md:flex md:items-center md:justify-between">
          <nav className="flex justify-center space-x-6 md:order-2">
            {[
              {
                name: "Twitter",
                href: "https://twitter.com/andreslemusm1",
                icon: Sitwitter,
              },
              {
                name: "GitHub",
                href: "https://github.com/andreslemusm",
                icon: Sigithub,
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/andreslemusm",
                icon: Silinkedin,
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-500 transition-colors hover:text-neutral-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs font-normal leading-5 text-neutral-400">
              &copy; {new Date().getFullYear()} Andres Lemus.{" "}
              <a
                href="/"
                className="inline-flex items-baseline gap-x-1 whitespace-nowrap hover:underline"
              >
                Powered by{" "}
                <img src={tmdbAltShort} alt="TMDB API" className="h-3 w-auto" />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
