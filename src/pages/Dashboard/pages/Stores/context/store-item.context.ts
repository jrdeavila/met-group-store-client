import { Item } from "@/pages/Dashboard/models";
import { createContext } from "react";

export interface StoreItemContextInterface {
  focus: boolean;
  items: Item[];
  setItems?: (items: Item[]) => void;
  setFocus?: (value: boolean) => void;
}

const StoreItemContext = createContext<StoreItemContextInterface>({
  focus: false,
  items: [],
});

export default StoreItemContext;
