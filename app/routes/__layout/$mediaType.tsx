import { Fragment } from "react";
import clsx from "clsx";
import { ChevronDown, Film, Tv } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, Outlet, useParams } from "@remix-run/react";

const MediaType = (): React.ReactElement => {
  const { mediaType } = useParams<"mediaType" | "listType">() as {
    mediaType: keyof typeof categories;
    // Improve typings
    listType: string;
  };

  const listTypesEl = (
    <div className="flex items-center gap-x-1">
      {categories[mediaType].map(({ label, path }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            clsx(
              isActive
                ? "bg-neutral-800 text-neutral-200"
                : "text-neutral-400 hover:text-neutral-200",
              "rounded-md px-3 py-2 text-sm font-bold transition"
            )
          }
          prefetch="intent"
          end
        >
          {label}
        </NavLink>
      ))}
    </div>
  );

  return (
    <Fragment>
      <div className="divide-y divide-neutral-800 pt-4 sm:pt-7 lg:pt-9">
        <div className="flex justify-between pb-4 lg:pb-0">
          <Menu as="div" className="relative">
            <Menu.Button className="flex w-32 items-center justify-between rounded-xl border border-neutral-700 bg-transparent px-3 py-2 text-sm text-neutral-300 transition hover:border-neutral-600 focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600">
              {{ tv: "TV Shows", movie: "Movies" }[mediaType]}
              <ChevronDown className="mt-0.5 h-4 w-4" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-36 origin-top-left rounded-xl bg-neutral-800 py-2 focus:outline-none">
                {[
                  {
                    label: "Movies",
                    path: "/movie/trending",
                    icon: Film,
                  },
                  {
                    label: "TV Shows",
                    path: "/tv/trending",
                    icon: Tv,
                  },
                ].map(({ label, path, icon: Icon }) => (
                  <Menu.Item key={path} as={Fragment}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        clsx(
                          isActive
                            ? "font-bold text-cyan-400"
                            : "text-neutral-200",
                          "flex items-center gap-x-3 px-4 py-2 text-sm ui-active:bg-neutral-700"
                        )
                      }
                      prefetch="intent"
                    >
                      {({ isActive }) => (
                        <Fragment>
                          <Icon
                            className={clsx(
                              isActive ? "text-cyan-400" : "text-neutral-400",
                              "mb-0.5 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />
                          {label}
                        </Fragment>
                      )}
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="hidden lg:block">{listTypesEl}</div>
          {/* TODO: add filter button here */}
          <div className="w-36"></div>
        </div>
        <div className="pt-5 lg:hidden">{listTypesEl}</div>
      </div>

      <Outlet />
    </Fragment>
  );
};

// TODO: add all categories
const categories = {
  tv: [
    {
      label: "Trending",
      path: "./trending",
    },
    /*
     * {
     *   label: "Airing Today",
     *   path: "./airing-today",
     * },
     */
  ],
  movie: [
    {
      label: "Trending",
      path: "./trending",
    },
    /*
     * {
     *   label: "Latest",
     *   path: "./latest",
     * },
     */
  ],
};

export default MediaType;
