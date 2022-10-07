import { AxiosCall } from "@/models";
import { loadAbort } from "@/utilities";
import axios from "axios";
import {
  EndpointStore,
  EndpointStoreCollection,
  FormDataStore,
} from "@/pages/Dashboard/models";

const storeApiUrl = `${import.meta.env.VITE_API_URL}/store`;

export const getStores = (): AxiosCall<EndpointStoreCollection> => {
  const controller = loadAbort();
  return {
    call: axios.get(storeApiUrl, { signal: controller.signal }),
    controller: controller,
  };
};

export const getStoreItem = (name: string): AxiosCall<EndpointStore> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${storeApiUrl}/${name}`, { signal: controller.signal }),
    controller: controller,
  };
};

export const postStoreItem = (name: string): AxiosCall<EndpointStore> => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${storeApiUrl}/${name}`,
      {},
      { signal: controller.signal }
    ),
    controller: controller,
  };
};

export const putStoreItem = (
  name: string,
  data: FormDataStore
): AxiosCall<EndpointStore> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${storeApiUrl}/${name}`, data, {
      signal: controller.signal,
    }),
    controller: controller,
  };
};

export const deleteStoreItem = (name: string): AxiosCall<any> => {
  const controller = loadAbort();
  return {
    call: axios.delete(`${storeApiUrl}/${name}`, {
      signal: controller.signal,
    }),
    controller: controller,
  };
};

export const trashStoreItem = (name: string): AxiosCall<any> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${storeApiUrl}/${name}/trash`, {
      signal: controller.signal,
    }),
    controller: controller,
  };
};

export const restoreStoreItem = (name: string): AxiosCall<EndpointStore> => {
  const controller = loadAbort();
  return {
    call: axios.put(`${storeApiUrl}/${name}/restore`, {
      signal: controller.signal,
    }),
    controller: controller,
  };
};
