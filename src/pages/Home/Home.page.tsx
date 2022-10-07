import { MainLayout } from "@/components";
import React from "react";
import { Link } from "react-router-dom";
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  return (
    <MainLayout withSidebar={false}>
      <div
        className="h-75 d-flex justify-content-center align-items-center flex-column gap-4"
        style={{
          userSelect: "none",
        }}
      >
        <div className="fs-1 fw-bolder text-center">
          Welcome to the Store App!
        </div>
        <div className="fs-4 d-flex gap-2 ">
          <div>You may do click here to login now</div>
          <Link to="/auth" className="text-white">
            Login
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
