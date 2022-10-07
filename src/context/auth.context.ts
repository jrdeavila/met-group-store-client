import { createContext } from "react";

export interface AuthContextInterface {
  token?: string;
  login?: (token: string) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextInterface>({});

export default AuthContext;
