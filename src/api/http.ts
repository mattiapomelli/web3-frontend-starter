import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { ApiErrorResponse, ApiResponse, PaginatedApiResponse } from "./types";

type ReponseErrorHandler = (error: ApiErrorResponse) => void;

interface HttpConfig extends AxiosRequestConfig {
  handleResponseError: ReponseErrorHandler;
}

export class Http {
  private http: AxiosInstance;

  constructor(config: HttpConfig) {
    this.http = axios.create(config);

    this.http.interceptors.response.use(this.handleResponse, (error) =>
      this.handleError(error, config.handleResponseError)
    );
  }

  get instance(): AxiosInstance {
    return this.http;
  }

  private handleResponse(res: AxiosResponse) {
    return res.data;
  }

  private handleError(
    error: AxiosError,
    handleResponseError: ReponseErrorHandler
  ) {
    // If there is no response, then just throw the error
    if (!error.response) throw error;

    // If there is a response, pass it to the handler
    handleResponseError(error.response as ApiErrorResponse);
  }

  get<T = null>(url: string) {
    return this.http.get<T, ApiResponse<T>>(url);
  }

  getPaginated<T = null>(url: string) {
    return this.http.get<T, PaginatedApiResponse<T>>(url);
  }

  post<T = null, R = null>(url: string, data?: T) {
    return this.http.post<T, ApiResponse<R>>(url, data);
  }

  put<T = null, R = null>(url: string, data?: T) {
    return this.http.put<T, ApiResponse<R>>(url, data);
  }

  delete<T = null>(url: string) {
    return this.http.delete<T, ApiResponse<T>>(url);
  }
}
