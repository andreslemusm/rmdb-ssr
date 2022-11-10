import { BrandIcon } from "~/assets";
import { Fragment } from "react";
import clsx from "clsx";
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
    icon: (props: React.ComponentPropsWithoutRef<"svg">) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/andreslemusm1",
    icon: (props: React.ComponentPropsWithoutRef<"svg">) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/andreslemusm",
    icon: (props: React.ComponentPropsWithoutRef<"svg">) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/andreslemusm/",
    icon: (props: React.ComponentPropsWithoutRef<"svg">) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
      </svg>
    ),
  },
];

export default Layout;
