import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
  FC,
} from "react";

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

export const useLocation = () => useContext(LocationContext).location;

export const useNavigate = () => {
  const { location, setLocation } = useContext(LocationContext);

  return (to: string, state?: object) => {
    history.pushState(state, "", to);
    setLocation({ ...location, pathname: to });
  };
};

const Router: FC<{ routes: Route[]; fallback: ReactNode }> = ({
  routes,
  fallback,
}) => {
  const location = useLocation();

  const currentRoute =
    routes.find(({ path }) => path === location.pathname)?.element || fallback;
  return currentRoute;
};

export const useRoutes = (routes: Route[], fallback: ReactNode) => {
  return (
    <LocationContextProvider>
      <Router routes={routes} fallback={fallback} />
    </LocationContextProvider>
  );
};
