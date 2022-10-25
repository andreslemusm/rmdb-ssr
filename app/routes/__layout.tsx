import { Fragment } from "react";
import { Outlet } from "@remix-run/react";

const Layout = (): React.ReactElement => {
  return (
    <Fragment>
      <header className="fixed inset-x-0 top-0 flex justify-center">
        <h1 className="font-bold">MOVEA</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
