import { LoadingScreen } from "components/layouts/loading-screen";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { autoLogin, login, UserData } from "services/auth";

type AuthContextProps = {
  user?: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
};

const AuthContext = createContext<AuthContextProps>(null!);

AuthContext.displayName = "User Context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    autoLogin()
      .then((user) => {
        return setUser(user);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be use whitin AuthProvider");
  }
  return ctx;
};

export { AuthProvider, useAuthContext };
