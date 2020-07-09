import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "itsy-bitsy-router";
import { MDXProvider } from "@mdx-js/react";

import Sidebar from "./components/Sidebar";
import Home from "./pages/index";
import MDX from "./components/MDX";
import Link from "~docs/api/Link.mdx";
import Navigate from "~docs/api/navigate.mdx";
import Hooks from "~docs/api/Hooks.mdx";
import R from "~docs/api/Router.mdx";
import Start from "~docs/guides/getting-started.mdx";

const App = () => {
  const Router = useRoutes(
    [
      { path: "/", element: Home },
      { path: "/getting-started", element: <Start /> },
      { path: "/link", element: <Link /> },
      { path: "/hooks", element: <Hooks /> },
      { path: "/router", element: <R /> },
      { path: "/navigate", element: <Navigate /> },
    ],
    <h1>404</h1>
  );

  return (
    <MDXProvider components={MDX}>
      <Router
        render={({ children }) => (
          <>
            <div className="flex h-full">
              <Sidebar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </>
        )}
      />
    </MDXProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root")!);
