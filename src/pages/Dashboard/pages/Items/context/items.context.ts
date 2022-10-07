import { createContext } from "react";

export interface ItemContextInterface {
  isDeleting: boolean;
  setIsDeleting?: (value: boolean) => void;
}

const ItemContext = createContext<ItemContextInterface>({
  isDeleting: false,
});

export default ItemContext;
