import Axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
} from "axios";
import { env } from "@/env/client";

type AllowedMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

export interface CustomAxiosRequestConfig<TRequest = unknown>
  extends AxiosRequestConfig<TRequest> {
  method: AllowedMethod;
  data?: TRequest;
}

export const customInstance = <TResponse, TRequest = unknown>(
  config: CustomAxiosRequestConfig<TRequest>,
  options?: AxiosRequestConfig,
): CancelablePromise<TResponse> => {
  const source: CancelTokenSource = Axios.CancelToken.source();

  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(
    (response: AxiosResponse<TResponse>) => response.data,
  ) as CancelablePromise<TResponse>;

  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
