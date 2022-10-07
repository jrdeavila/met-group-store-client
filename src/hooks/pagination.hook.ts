import { PaginationContext } from "@/context";
import { useContext } from "react";

export const usePagination = () => {
  return useContext(PaginationContext);
};
