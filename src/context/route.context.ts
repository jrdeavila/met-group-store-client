import { Authentication, Home, Dashboard } from "@/pages";
import { createContext } from "react";
import { Route } from "../pages/App/models";
import { BasicRoutes, UserRoutes } from "./routes";

export interface RouteContextInterface {
  routes: Route[];
  userRoutes: Route[];
}

export const initialRouteContext: RouteContextInterface = {
  routes: BasicRoutes,
  userRoutes: UserRoutes,
};

const RouteContext = createContext<RouteContextInterface>(initialRouteContext);

export default RouteContext;
