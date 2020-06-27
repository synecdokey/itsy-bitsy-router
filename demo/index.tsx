import React from "react";
import ReactDOM from "react-dom";

import { Link, useRoutes, useNavigate, useParams } from "../src";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h2>Home Page</h2>
    </main>
  );
};

const Test = () => {
  return (
    <main>
      <h2>Test page</h2>
      <Link to="/user/mono" state={{ from: "test page" }}>
        Some other page
      </Link>
    </main>
  );
};

const User = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <main>
      <button
        onClick={() => navigate(undefined, { state: { from: "button" } })}
      >
        State from button
      </button>
      <Link state={{ from: "link" }}>Set some link state</Link>
      <button
        onClick={() => {
          history.back();
        }}
      >
        Back
      </button>
      <p>history: {JSON.stringify(history.state)}</p>
      <p>User: {username}</p>
    </main>
  );
};

const App = () => {
  const Router = useRoutes(
    [
      { path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
      { path: "/user/:username", element: <User /> },
    ],
    <p>404</p>
  );

  return (
    <Router
      render={({ children }) => (
        <>
          <header>
            <h1>Router demo</h1>
            <nav role="navigation">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/test">Test</Link>
                </li>
                <li>
                  <Link to="/nowhere">Nowhere</Link>
                </li>
              </ul>
            </nav>
          </header>
          {children}
        </>
      )}
    />
  );
};

ReactDOM.unstable_createRoot(document.getElementById("root")!).render(<App />);
