import { AxiosCall } from "@/models";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useFetchAndLoading<T>() {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async (
    axiosCall: AxiosCall<T>
  ): Promise<T | undefined> => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<T>;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      result = await axiosCall.call;
      setLoading(false);
      return result.data;
    } catch (e: any) {
      setLoading(false);
      return;
    }
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);
  return { loading, callEndpoint };
}
