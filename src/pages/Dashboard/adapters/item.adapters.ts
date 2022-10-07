import { EndpointItem, EndpointItemCollection, Item } from "../models";

export const createAdapttedItemList = (
  endpoint: EndpointItemCollection
): Item[] => {
  return endpoint.items.map((e) => createAdapttedItem(e));
};

export const createAdapttedItem = (endpoint: EndpointItem): Item => {
  return {
    name: endpoint.name,
    price: endpoint.price,
    storeId: endpoint.store_id,
  };
};
