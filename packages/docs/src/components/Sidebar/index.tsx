import React, { FC, HTMLProps, DetailedHTMLProps } from "react";
import { Link } from "itsy-bitsy-router";

const NavHeading = (props) => (
  <h4 className="uppercase font-bold text-gray-800 pt-4" {...props} />
);

const NavLink: typeof Link = ({ className, ...props }) => (
  <li>
    <Link className={`pl-4 hover:underline text-sm ${className}`} {...props} />
  </li>
);

const PropLink: typeof Link = ({ className, ...props }) => (
  <li>
    <Link
      className={`pl-8 text-gray-700 hover:underline text-sm ${className}`}
      {...props}
    />
  </li>
);

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 h-full">
      <nav className="flex flex-col p-4 h-full">
        <Link
          to="/"
          className="uppercase font-bold text-lg underline text-red-800"
        >
          Itsy-bitsy-router
        </Link>
        <NavHeading>Guides</NavHeading>
        <ul>
          <NavLink to="getting-started">Getting started</NavLink>
        </ul>
        <NavHeading>API</NavHeading>
        <ul>
          <NavLink to="hooks">Hooks</NavLink>
          <PropLink to="useRoutes">useRoutes</PropLink>
          <PropLink to="useParams">useParams</PropLink>
          <PropLink to="useNavigate">useNavigate</PropLink>
          <PropLink to="useLocation">useLocation</PropLink>
          <NavLink to="link">{"<Link />"}</NavLink>
          <PropLink to="link#to">to: string</PropLink>
          <PropLink to="link#state">state: object</PropLink>
          <PropLink to="link#replace">replace: boolean</PropLink>
          <NavLink to="router">{"<Router />"}</NavLink>
          <PropLink to="router#render">render: Function</PropLink>
          <NavLink to="navigate">navigate</NavLink>
          <PropLink to="navigate#to">to: string</PropLink>
          <PropLink to="navigate#opts">opts: object</PropLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
