import { ErrorResponse } from "@/models";
import { AxiosError } from "axios";

export const createAdapttedError = (error: AxiosError<any>): ErrorResponse => {
  return {
    help: error.response?.data.help ?? "",
    error:
      typeof error.response?.data.error == "object"
        ? ""
        : error.response?.data.error,
    status: error.response?.status ?? 0,
  };
};
