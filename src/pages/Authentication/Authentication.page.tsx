import { MainLayout } from "@/components";
import React, { useState } from "react";
import { AuthForm } from "./components";
import { AuthContext } from "./context";
export interface AuthenticationInterface {}

const Authentication: React.FC<AuthenticationInterface> = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <AuthContext.Provider value={{ toggle, setToggle }}>
      <MainLayout withSidebar={false}>
        <div className="d-flex justify-content-center align-items-center h-100 p-5">
          <AuthForm />
        </div>
      </MainLayout>
    </AuthContext.Provider>
  );
};

export default Authentication;
