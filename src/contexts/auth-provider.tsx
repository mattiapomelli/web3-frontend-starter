import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { User } from "@api/users";

import { ApiClient } from "../api/client";

const ApiClientContext = createContext<ApiClient | undefined>(undefined);

interface UserContextValue {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUnauthorizedError = async () => {
    setUser(null);
  };

  const apiClientRef = useRef(
    new ApiClient({
      handleUnauthorizedError,
    }),
  );

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await apiClientRef.current.auth.getLoggedUser();

        setUser(loggedUser);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getLoggedUser();
  }, []);

  return (
    <ApiClientContext.Provider value={apiClientRef.current}>
      <UserContext.Provider value={{ user, loading, setUser }}>
        {children}
      </UserContext.Provider>
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = useContext(ApiClientContext);

  if (context === undefined) {
    throw new Error("useApiClient must be used within an AuthProvider");
  }

  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
