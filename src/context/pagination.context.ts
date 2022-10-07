import { createContext } from "react";

export interface PaginationContextInterface {
  setItems?: (items: any[]) => void;
  currentItems?: any[] | undefined;
  PaginationBar?: React.ReactNode;
  setDivisor?: (value: number) => void;
}

const PaginationContext = createContext<PaginationContextInterface>({});

export default PaginationContext;
