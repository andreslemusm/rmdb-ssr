import { Fragment } from "react";
import clsx from "clsx";
import { NavLink, Outlet } from "@remix-run/react";

const Movie = () => (
  <Fragment>
    <nav
      className="flex items-center gap-x-1 overflow-x-auto pt-5 md:pt-6 lg:pt-7"
      aria-label="Tabs"
    >
      {["Overview", "Credits", "Reviews"].map((tab) => (
        <NavLink
          key={tab}
          to={tab === "Overview" ? "." : `./${tab.toLowerCase()}`}
          className={({ isActive }) =>
            clsx(
              isActive
                ? "bg-neutral-800 text-neutral-200"
                : "text-neutral-400 hover:text-neutral-200",
              "shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition"
            )
          }
          end
        >
          {tab}
        </NavLink>
      ))}
    </nav>
    <Outlet />
  </Fragment>
);

export default Movie;
