import { useContext } from "react";
import { StoreItemContext } from "../context";

export const useStoreItem = () => {
  return useContext(StoreItemContext);
};
