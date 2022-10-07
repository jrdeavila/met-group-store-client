import {
  EndpointItem,
  EndpointStore,
  EndpointStoreCollection,
  FormDataEditItem,
  FormDataItem,
  Item,
  Store,
} from "@/pages/Dashboard/models";

export const createAdapttedStore = (endpoint: EndpointStore): Store => {
  return {
    id: endpoint.id,
    name: endpoint.name,
    items: endpoint.items.map((e) => createAdapttedItem(e)),
  };
};

export const createAdapttedStoreList = (
  endpoint: EndpointStoreCollection
): Store[] => {
  return endpoint.stores.map((e) => createAdapttedStore(e));
};

export const formEditToFormDataItem = (
  data: FormDataEditItem
): FormDataItem => {
  return {
    price: data.price,
    store_id: data.store_id,
  };
};

export const createAdapttedItem = (endpoint: EndpointItem): Item => {
  return {
    name: endpoint.name,
    price: endpoint.price,
  };
};
