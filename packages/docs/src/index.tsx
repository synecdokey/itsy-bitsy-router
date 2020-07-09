import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "itsy-bitsy-router";

import Sidebar from "./components/Sidebar";
import Home from "./pages/index";
import Link from "~docs/api/Link.mdx";

const App = () => {
  const Router = useRoutes(
    [
      { path: "/", element: Home },
      {
        path: "/link/",
        element: <Link />,
      },
    ],
    <p>404</p>
  );

  return (
    <Router
      render={({ children }) => (
        <>
          <div className="flex h-full">
            <Sidebar />
            <main className="px-2 py-4">{children}</main>
          </div>
        </>
      )}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root")!);
