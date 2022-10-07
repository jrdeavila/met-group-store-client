export interface Item {
  name: string;
  price: number;
  storeId: number;
}

export interface EndpointItem {
  name: string;
  price: number;
  store_id: number;
}

export interface FormDataItem {
  price: number;
  store_id: number;
}

export interface FormDataEditItem {
  name: string;
  price: number;
  store_id: number;
}

export interface EndpointItemCollection {
  items: EndpointItem[];
}
