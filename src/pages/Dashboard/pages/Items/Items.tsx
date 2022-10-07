import { MainLayout, PaginationProvider, SpinnerLoading } from "@/components";
import { useAppDispatch, useAsync, useFetchAndLoading } from "@/hooks";
import { addItems } from "@/redux";
import React, { useState } from "react";
import { createAdapttedItemList } from "../../adapters/item.adapters";
import { EndpointItemCollection } from "../../models";
import { getItems } from "../../services";
import { ShowItems } from "./components";
import { ItemContext } from "./context";
export interface ItemsInterface {}

const Items: React.FC<ItemsInterface> = () => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const { loading, callEndpoint } =
    useFetchAndLoading<EndpointItemCollection>();

  const promise = async () => callEndpoint(getItems());
  const result = (data: EndpointItemCollection | undefined) => {
    const items = data && createAdapttedItemList(data);
    items && dispatch(addItems(items));
  };

  useAsync<EndpointItemCollection | undefined>(promise, result, undefined, []);

  return (
    <MainLayout>
      <PaginationProvider>
        <ItemContext.Provider value={{ isDeleting, setIsDeleting }}>
          <div className="h-100">
            {loading ? (
              <div className="h-100 d-flex justify-content-center align-items-center text-white">
                <SpinnerLoading />
              </div>
            ) : (
              <ShowItems />
            )}
          </div>
        </ItemContext.Provider>
      </PaginationProvider>
    </MainLayout>
  );
};

export default Items;
