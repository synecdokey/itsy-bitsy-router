import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

const LocationContext = createContext<{
  location: Location;
  setLocation: (location: Location) => void;
}>({
  location: window.location,
  setLocation: () => {},
});

export const LocationContextProvider: FC = ({ children }) => {
  const [location, setLocation] = useState({ ...window.location });
  useEffect(() => {
    const listener = () => {
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

  return (to?: string, opts?: { state?: object; replace?: boolean }) => {
    const method = opts?.replace ? "replaceState" : "pushState";
    history[method](opts?.state, "", to);
    setLocation({ ...location, pathname: to || location.pathname });
  };
};
