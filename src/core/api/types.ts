/** Entrada de error devuelta por la API (código general, validación por campo o mixto). */
export type ApiError = {
  code?: string;
  field?: string;
  message: string;
};

export type ApiPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  next: string | null;
  previous: string | null;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  pagination?: ApiPagination;
  errors: ApiError[] | null;
};
