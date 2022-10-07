import { MainLayout } from "@/components";
import React, { useContext } from "react";

export interface DashboardInterface {}

const Dashboard: React.FC<DashboardInterface> = () => {
  return (
    <MainLayout>
      <div
        className="h-75 d-flex justify-content-center align-items-center flex-column gap-4"
        style={{
          userSelect: "none",
        }}
      >
        <div className="fs-1 fw-bolder text-center">Welcome back!</div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
