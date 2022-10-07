import React from "react";
import ReactDOM from "react-dom/client";
import { PublicPrivateInterceptor } from "./interceptors";
import { MainApp } from "./pages";

PublicPrivateInterceptor();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
