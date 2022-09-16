import { Outlet } from "@remix-run/react";
import { Fragment } from "react";

const Layout = () => {
  return (
    <Fragment>
      <header className="fixed top-0 inset-x-0 flex justify-center">
        <h1 className="font-bold">MOVEA</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
