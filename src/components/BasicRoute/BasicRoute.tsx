import { useAuth } from "@/hooks";
import React from "react";
import { Navigate } from "react-router-dom";
export interface BasicRouteInterface {
  children: React.ReactNode;
}

const BasicRoute: React.FC<BasicRouteInterface> = ({ children }) => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

export default BasicRoute;
