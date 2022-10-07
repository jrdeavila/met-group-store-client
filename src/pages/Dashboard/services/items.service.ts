import { AxiosCall } from "@/models";
import { loadAbort } from "@/utilities";
import axios from "axios";
import {
  EndpointItem,
  EndpointItemCollection,
  FormDataEditItem,
  FormDataItem,
} from "../models";

const itemsApiUrl = `${import.meta.env.VITE_API_URL}/item`;

export const getItems = (): AxiosCall<EndpointItemCollection> => {
  const controller = loadAbort();
  return {
    call: axios.get(itemsApiUrl, { signal: controller.signal }),
    controller,
  };
};

export const postItem = (
  name: string,
  data: FormDataItem
): AxiosCall<EndpointItem> => {
  const controller = loadAbort();
  return {
    call: axios.post(`${itemsApiUrl}/${name}`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getItem = (name: string): AxiosCall<EndpointItem> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${itemsApiUrl}/${name}`, { signal: controller.signal }),
    controller,
  };
};

export const deleteItem = (name: string): AxiosCall<any> => {
  const controller = loadAbort();
  return {
    call: axios.delete(`${itemsApiUrl}/${name}`, { signal: controller.signal }),
    controller,
  };
};

export const putItem = (
  name: string,
  data: FormDataEditItem
): AxiosCall<EndpointItem> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${itemsApiUrl}/${name}`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};
