import { RouteContext } from "@/context";
import { useContext } from "react";

export const useRoute = () => {
  return useContext(RouteContext);
};
