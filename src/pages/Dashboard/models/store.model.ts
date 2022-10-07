import { EndpointItem, Item } from "./item.model";

export interface FormDataStore {
  name: string;
}

export interface Store {
  id: number;
  name: string;
  items: Item[];
}

export interface EndpointStore {
  id: number;
  name: string;
  items: EndpointItem[];
}

export interface EndpointStoreCollection {
  stores: EndpointStore[];
}
