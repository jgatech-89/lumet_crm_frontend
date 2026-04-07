/** Entrada de error devuelta por la API (código general, validación por campo o mixto). */
export type ApiError = {
  code?: string;
  field?: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errors: ApiError[] | null;
};
