import React from "react";

export interface Route {
  name: string;
  element: React.ReactNode;
  icon: React.ReactNode;
  path: string;
}
