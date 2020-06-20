import React from "react";
import ReactDOM from "react-dom";

import { useRoutes, useNavigate } from "../src";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <a onClick={() => navigate("/test")}>test</a>
    </main>
  );
};

const Test = () => {
  const navigate = useNavigate();

  return (
    <main>
      <a onClick={() => navigate("/")}>home</a>
    </main>
  );
};

const App = () => {
  const elem = useRoutes(
    [
      { path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
    ],
    <p>404</p>
  );

  return <>{elem}</>;
};

ReactDOM.unstable_createRoot(document.getElementById("root")!).render(<App />);
