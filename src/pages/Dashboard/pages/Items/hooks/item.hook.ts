import { useContext } from "react";
import { ItemContext } from "../context";

export const useItems = () => {
  return useContext(ItemContext);
};
