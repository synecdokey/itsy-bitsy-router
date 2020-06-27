import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
  FC,
} from "react";
import { match, MatchFunction } from "path-to-regexp";

export { Link } from "./Link";
import { LocationContextProvider, useLocation } from "./Location";

export { useLocation, useNavigate } from "./Location";

type Route = {
  path: string;
  element: ReactNode;
};

const RouterContext = createContext<{
  params: object;
  currentRoute: ReactNode;
}>({ params: {}, currentRoute: null });

const RouterContextProvider: FC<{
  matches: { match: MatchFunction; element: ReactNode }[];
}> = ({ matches, children }) => {
  const location = useLocation();
  const [params, setParams] = useState({});
  const [currentRoute, setCurrentRoute] = useState<ReactNode>(null);

  useEffect(() => {
    const route = matches.find(({ match }) => {
      const matched = match(location.pathname);
      if (matched) {
        setParams(matched.params as Record<string, string>);
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

export const useParams = () => useContext(RouterContext).params;

const Router = ({ children }) => {
  const { currentRoute } = useContext(RouterContext);
  return currentRoute || children;
};

export const useRoutes = (routes: Route[], fallback: ReactNode) => {
  const matches = routes.map(({ path, element }) => ({
    match: match(path),
    element,
  }));

  return (
    <LocationContextProvider>
      <RouterContextProvider matches={matches}>
        <Router>{fallback}</Router>
      </RouterContextProvider>
    </LocationContextProvider>
  );
};
