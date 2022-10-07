import { createAdapttedError } from "@/adapters/error.adapters";
import { getBasicAuthorization, GreatSnackbarUtilities } from "@/utilities";
import axios, { AxiosError } from "axios";

export const PublicPrivateInterceptor = () => {
  axios.interceptors.request.use((config) => {
    if (config.headers?.Authorization) {
      return config;
    }

    const token = getBasicAuthorization();
    config.headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    return config;
  });

  axios.interceptors.response.use(
    (config) => {
      return config;
    },
    (error: AxiosError<any>) => {
      if (error.response)
        GreatSnackbarUtilities.snackbar(createAdapttedError(error));
    }
  );
};
