import { Fragment } from "react";
import clsx from "clsx";
import {
  BrandIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "~/assets";
import { Form, Link, NavLink, Outlet } from "@remix-run/react";
import { Menu, Search, X } from "lucide-react";
import { Popover, Transition } from "@headlessui/react";

const Layout = (): React.ReactElement => (
  <Fragment>
    <header className="border-b border-neutral-800 px-4 py-6 sm:py-7 sm:px-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-8">
          <Link to="/" className="flex-shrink-0">
            <span className="sr-only">Home</span>
            <BrandIcon className="block h-9 w-9 text-white" />
          </Link>
          <div className="hidden lg:block">
            <nav className="flex items-center gap-x-4">
              <NavLink
                to="/discover"
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? "text-neutral-100 underline underline-offset-4"
                      : "text-neutral-400",
                    "rounded-lg px-3 py-1 text-base font-bold transition hover:bg-neutral-800 hover:text-neutral-200 hover:no-underline"
                  )
                }
              >
                Discover
              </NavLink>
            </nav>
          </div>
        </div>
        <Form action="/search" className="w-full max-w-lg lg:max-w-md">
          <label htmlFor="search" className="relative block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search
                className="h-5 w-5 text-neutral-400"
                aria-label="Search"
              />
            </div>
            <input
              name="query"
              className="block w-full rounded-xl border border-transparent bg-neutral-800 py-2 pl-10 pr-3 leading-5 text-neutral-300 placeholder-neutral-400 transition hover:border-neutral-700 focus:border-neutral-700 focus:outline-none focus:ring-neutral-700 sm:text-sm"
              placeholder="/search/multi-search"
              type="search"
            />
          </label>
        </Form>
        <Popover className="-ml-1 shrink-0 lg:hidden">
          <Popover.Button className="rounded-lg border-none p-1.5 text-base font-bold text-neutral-400 transition focus:outline-none focus:ring-2 focus:ring-neutral-700">
            <span className="sr-only">Open navigation menu</span>
            <Menu className="h-6 w-6" />
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 z-20 bg-black/80 backdrop-blur-sm" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-4 transition"
              >
                <div className="rounded-xl bg-neutral-900 ring-1 ring-neutral-800">
                  <div className="py-5">
                    <div className="flex items-center justify-between px-4">
                      <Link
                        to="/"
                        className="flex-shrink-0 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-neutral-700"
                      >
                        <span className="sr-only">Home</span>
                        <BrandIcon className="block h-9 w-9 text-white" />
                      </Link>
                      <Popover.Button className="text-neutral-400">
                        <span className="sr-only">Close navigation menu</span>
                        <X className="h-8 w-8" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                    <div className="mt-5 space-y-1 px-3">
                      <Popover.Button
                        as={Link}
                        to="/discover"
                        className="block rounded-xl px-3 py-2 text-base font-bold capitalize text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                      >
                        Discover
                      </Popover.Button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </Popover>
      </div>
    </header>
    <div className="px-4 sm:px-4 lg:px-8">
      <main className="mx-auto w-full max-w-7xl">
        <Outlet />
      </main>
    </div>
    <footer className="border-t border-neutral-800">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <nav className="flex justify-center space-x-6 md:order-2">
          {socialNetworks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-neutral-400 hover:text-neutral-500"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-neutral-400">
            &copy; {new Date().getFullYear()} Andres Lemus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </Fragment>
);

const socialNetworks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/andreslemusm/",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/andreslemusm1",
    icon: TwitterIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/andreslemusm",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/andreslemusm/",
    icon: LinkedInIcon,
  },
];

export default Layout;
