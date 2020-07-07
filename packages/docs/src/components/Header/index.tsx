import React from "react";
import { Link } from "itsy-bitsy-router";
import { version } from "../../../package.json";

const Header = () => {
  return (
    <header role="banner" className="flex flex-col justify-around">
      <div className="flex bg-purple-900 text-white p-2">
        <Link to="/" className="flex-1 font-bold text-xl hover:underline">
          itsy-bitsy-router
        </Link>
        <span className="text-right my-auto">Version {version}</span>
      </div>
      <nav role="navigation" className="p-2 font-bold">
        <ul className="flex flex-col">
          <li>
            <h2 className="font-bold">Test</h2>
          </li>
          <li>
            <Link to="/get-started">Get started</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
