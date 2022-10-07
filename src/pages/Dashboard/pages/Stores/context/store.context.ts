import { createContext } from "react";

export interface StoreContextInterface {
  isDeleting: boolean;
  setIsDeleting?: (value: boolean) => void;
}

export const initialStoreContext: StoreContextInterface = {
  isDeleting: false,
};
const StoreContext = createContext<StoreContextInterface>(initialStoreContext);

export default StoreContext;
