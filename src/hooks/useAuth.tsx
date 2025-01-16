import { createContext, useContext, useMemo, ReactNode } from "react";
import useSessionStorage from "./useSessionStorage";
const AuthContext = createContext<AuthContextType>({
  // is this really necessary? Find prettier way pls
  login: () => console.log("not defined"),
  token: null,
  logout: () => console.log("not defined"),
});

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  login: (token: string | null) => void;
  token: string | null;
  logout: () => void;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useSessionStorage("spotify_access_token", null);

  // login method
  const login = (token: string | null ) => {
    if (token !== null) {
      setToken(token);
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};