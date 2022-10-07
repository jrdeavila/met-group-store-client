import { MainLayout, PaginationProvider, SpinnerLoading } from "@/components";
import {
  useFetchAndLoading,
  useAppDispatch,
  useAsync,
  useAppSelector,
} from "@/hooks";
import { addStores, resetStores, StoreSelector } from "@/redux";
import React, { useState } from "react";
import { createAdapttedStoreList } from "../../adapters/store.adapters";
import { EndpointStoreCollection } from "../../models";
import { ShowStores } from "./components";
import { StoreContext } from "./context";
import { getStores } from "@/pages/Dashboard/services";
export interface StoresInterface {}

const Stores: React.FC<StoresInterface> = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const stores = useAppSelector(StoreSelector);

  const { loading, callEndpoint } =
    useFetchAndLoading<EndpointStoreCollection>();
  const dispatch = useAppDispatch();
  const promise = async () => callEndpoint(getStores());
  const result = (value: EndpointStoreCollection | undefined) => {
    const stores = value && createAdapttedStoreList(value);
    stores && dispatch(addStores(stores));
  };

  useAsync<EndpointStoreCollection | undefined>(
    promise,
    result,
    () => {
      return () => dispatch(resetStores);
    },
    [!stores]
  );
  return (
    <MainLayout>
      <PaginationProvider>
        <StoreContext.Provider value={{ isDeleting, setIsDeleting }}>
          <div className="h-100">
            {loading ? (
              <div className="h-100 d-flex justify-content-center align-items-center text-white">
                <SpinnerLoading />
              </div>
            ) : (
              <ShowStores />
            )}
          </div>
        </StoreContext.Provider>
      </PaginationProvider>
    </MainLayout>
  );
};

export default Stores;
