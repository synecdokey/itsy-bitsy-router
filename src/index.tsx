import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
  FC,
  ReactElement,
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
  params: Record<string, string>;
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

type RouterProps = {
  render: FC;
  children: ReactNode;
};

const Router = ({ render, children }: RouterProps) => {
  const { currentRoute } = useContext(RouterContext);
  const route: ReactNode = currentRoute || children;
  return (render ? render({ children: route }) : route) as JSX.Element;
};

export const useRoutes = (routes: Route[], fallback: ReactElement) => {
  const matches = routes.map(({ path, element }) => ({
    match: match(path),
    element,
  }));

  return ({ render }: { render: FC }) => (
    <LocationContextProvider>
      <RouterContextProvider matches={matches}>
        <Router render={render}>{fallback}</Router>
      </RouterContextProvider>
    </LocationContextProvider>
  );
};
