import { calcPages } from "@/utilities";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { PaginationContext } from "@/context";
import { PaginationContextInterface } from "@/context/pagination.context";
import PaginationBar from "./PaginationBar";

const PaginationProvider = (props: { children: React.ReactNode }) => {
  const [items, setItems] = useState<any[]>();
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [divisor, setDivisor] = useState(6);

  const Pagination = pages > 1 && (
    <PaginationBar
      pages={pages}
      setCurrentPage={(index: number) => setCurrentPage(index)}
    />
  );

  useEffect(() => {
    const start = currentPage * divisor;
    items && setPages(calcPages(items, divisor));
    items && setCurrentItems(items.slice(start, start + divisor));
  }, [items, currentPage]);

  const updateItems = (items: any[]) => {
    setItems(items);
  };

  const value = useMemo<PaginationContextInterface>(
    () => ({
      setItems: updateItems,
      currentItems,
      PaginationBar: Pagination,
      setDivisor,
    }),
    [items, currentItems]
  );

  return (
    <PaginationContext.Provider value={value}>
      {props.children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
