export interface ApiResponse<T> {
  code: number;
  data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number;
    perPage: number;
    page: number;
  };
}

export interface ApiErrorResponse {
  status: number;
  data: ApiResponse<Record<string, string>> & {
    message: string;
  };
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
