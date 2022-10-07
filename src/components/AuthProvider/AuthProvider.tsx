import { AuthContext } from "@/context";
import { AuthContextInterface } from "@/context/auth.context";
import { useLocalStorage } from "@/hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthProviderInterface {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const { storedValue, setValue } = useLocalStorage<string>("token", "");
  const navigate = useNavigate();

  const login = (newToken: string) => {
    setValue(newToken);
    navigate("/dashboard");
  };

  const logout = () => {
    setValue("");
    navigate("/auth");
  };

  const value = useMemo<AuthContextInterface>(() => {
    return {
      token: storedValue,
      login,
      logout,
    };
  }, [storedValue]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
