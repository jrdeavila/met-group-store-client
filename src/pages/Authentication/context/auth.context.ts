import { createContext } from "react";

export interface AuthContextInterface {
  username?: string;
  toggle: boolean;
  setToggle?: (value: boolean) => void;
}

export const initAuthContext: AuthContextInterface = {
  toggle: false,
};

const AuthContext = createContext<AuthContextInterface>(initAuthContext);

export default AuthContext;
