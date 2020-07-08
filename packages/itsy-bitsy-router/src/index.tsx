import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
  FC,
} from "react";

import match from "./match";

export { Link } from "./Link";
import { LocationContextProvider, useLocation } from "./Location";

export { useLocation, useNavigate } from "./Location";

type Route = {
  path: string;
  element: ReactNode;
};

const RouterContext = createContext<{
  params: Record<string, string>;
  currentRoute: ReactNode;
}>({ params: {}, currentRoute: null });

const RouterContextProvider: FC<{
  matches: { match: RegExp; element: ReactNode }[];
}> = ({ matches, children }) => {
  const location = useLocation();
  const [params, setParams] = useState({});
  const [currentRoute, setCurrentRoute] = useState<ReactNode>(null);

  useEffect(() => {
    const route = matches.find(({ match }) => {
      const matched = match.exec(location.pathname);
      if (matched) {
        setParams(matched.groups as Record<string, string>);
      }
      return matched;
    })?.element;
    setCurrentRoute(route || null);
  }, [location]);

  return (
    <RouterContext.Provider value={{ params, currentRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

/**
 * `useParams` is a hook that returns the matching parameters of your route path
 */
export const useParams = () => useContext(RouterContext).params;

type RouterProps = {
  render?: FC;
  children: ReactNode;
};

const Router = ({ render, children }: RouterProps) => {
  const { currentRoute } = useContext(RouterContext);
  const route: ReactNode = currentRoute || children;
  return (render ? render({ children: route }) : route) as JSX.Element;
};

/**
 * `useRoutes` is a hook that allows you to declaratively describe your routes,
 * and returns a Router as a react element
 * @param routes   An Array of javascript objects representing a route
 * @param fallback The element to display in case nothing matches
 */
export const useRoutes = (routes: Route[], fallback: JSX.Element) => {
  const matches = routes.map(({ path, element }) => ({
    match: match(path),
    element,
  }));

  return ({ render }: { render?: FC }): JSX.Element => (
    <LocationContextProvider>
      <RouterContextProvider matches={matches}>
        <Router render={render}>{fallback}</Router>
      </RouterContextProvider>
    </LocationContextProvider>
  );
};
