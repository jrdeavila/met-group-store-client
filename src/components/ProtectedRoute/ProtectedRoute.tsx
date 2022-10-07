import { useAuth } from "@/hooks";
import React from "react";
import { Navigate } from "react-router-dom";
export interface ProtectedRouteInterface {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteInterface> = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
