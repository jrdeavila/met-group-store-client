import { AxiosResponse } from "axios";
import { useEffect } from "react";

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  successFn: (value: T) => void,
  returnFn?: Function,
  dependencies: any[] = []
) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((result) => {
      if (isActive) successFn(result);
    });
    return () => {
      returnFn && returnFn();
      isActive = false;
    };
  }, dependencies);
}
