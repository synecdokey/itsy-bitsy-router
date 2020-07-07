import React from "react";
import ReactDOM from "react-dom";
import { Link, useRoutes, useNavigate, useParams } from "itsy-bitsy-router";
import Header from "./components/Header";

const Home = () => {
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
          <Header />
          {children}
        </>
      )}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root")!);
