import React from "react";
import { Spinner } from "react-bootstrap";
export interface SpinnerLoadingInterface {}

const SpinnerLoading: React.FC<SpinnerLoadingInterface> = () => {
  return (
    <>
      <Spinner animation="border" style={{ height: 50, width: 50 }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default SpinnerLoading;
