import React from "react";
import ReactDOM from "react-dom";

import { Link, useRoutes, useNavigate, useParams } from "../src";

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
      <Link to="/">home</Link>
      <a onClick={() => navigate("/user/mono")}>mono</a>
    </main>
  );
};

const User = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => navigate(undefined, { state: { wow: "wowie" } })}>
        prev
      </button>
      <p>history: {JSON.stringify(history.state)}</p>
      <p>User: {username}</p>
    </main>
  );
};

const App = () => {
  const elem = useRoutes(
    [
      { path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
      { path: "/user/:username", element: <User /> },
    ],
    <p>404</p>
  );

  return <>{elem}</>;
};

ReactDOM.unstable_createRoot(document.getElementById("root")!).render(<App />);
