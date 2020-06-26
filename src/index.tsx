import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
  FC,
} from "react";
import { match } from "path-to-regexp";

type Route = {
  path: string;
  element: ReactNode;
};

const LocationContext = createContext({
  location: window.location,
  setLocation: () => {},
});

const LocationContextProvider: FC = ({ children }) => {
  const [location, setLocation] = useState({ ...window.location });
  useEffect(() => {
    const listener = (ev) => {
      setLocation({ ...window.location });
    };
    window.addEventListener("popstate", listener);

    return () => window.removeEventListener("popstate", listener);
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

const RouterContext = createContext({ params: {}, currentRoute: null });

const RouterContextProvider = ({ matches, children }) => {
  const location = useLocation();
  const [params, setParams] = useState({});
  const [currentRoute, setCurrentRoute] = useState<ReactNode>(null);

  useEffect(() => {
    const route = matches.find(({ match }) => {
      const matched = match(location.pathname);
      if (matched) {
        console.log(matched.params);
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

export const useLocation = () => useContext(LocationContext).location;

export const useNavigate = () => {
  const { location, setLocation } = useContext(LocationContext);

  return (to: string, state?: object) => {
    history.pushState(state, "", to);
    setLocation({ ...location, pathname: to });
  };
};

export const useParams = () => useContext(RouterContext).params;

const Router: FC<{ fallback: ReactNode }> = ({ fallback }) => {
  const { currentRoute } = useContext(RouterContext);
  return currentRoute;
};

export const useRoutes = (routes: Route[], fallback: ReactNode) => {
  const matches = routes.map(({ path, element }) => ({
    match: match(path),
    element,
  }));

  return (
    <LocationContextProvider>
      <RouterContextProvider matches={matches}>
        <Router fallback={fallback} />
      </RouterContextProvider>
    </LocationContextProvider>
  );
};
