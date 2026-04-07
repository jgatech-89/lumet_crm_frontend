import axios, { type AxiosError } from "axios";

import type { ApiError, ApiResponse } from "./types";

const DEFAULT_ERROR_MESSAGE = "Ha ocurrido un error. Inténtalo de nuevo.";

function firstErrorCode(errors: ApiError[] | null | undefined): string | undefined {
  if (!errors?.length) return undefined;
  const withCode = errors.find((e) => typeof e.code === "string" && e.code.length > 0);
  return withCode?.code;
}

/** Error lanzado por el cliente HTTP cuando la API indica fallo o `success === false`. */
export class ApiRequestError extends Error {
  readonly errors: ApiError[] | null;
  /** Primer `code` presente en `errors` (p. ej. `invalid_credentials`). */
  readonly code: string | undefined;
  readonly status: number | undefined;
  readonly originalError: unknown;

  constructor(
    message: string,
    options: {
      errors?: ApiError[] | null;
      status?: number;
      originalError?: unknown;
    } = {},
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.errors = options.errors ?? null;
    this.status = options.status;
    this.originalError = options.originalError;
    this.code = firstErrorCode(this.errors);
  }
}

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return error instanceof ApiRequestError;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function normalizeErrorEntries(raw: unknown): ApiError[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: ApiError[] = [];
  for (const item of raw) {
    if (!isRecord(item) || typeof item.message !== "string") continue;
    const entry: ApiError = { message: item.message };
    if (typeof item.code === "string") entry.code = item.code;
    if (typeof item.field === "string") entry.field = item.field;
    out.push(entry);
  }
  return out.length ? out : null;
}

function parseStandardApiErrorBody(
  data: unknown,
): { message: string; errors: ApiError[] | null } | null {
  if (!isRecord(data)) return null;
  if (data.success !== false) return null;
  const message = typeof data.message === "string" ? data.message : DEFAULT_ERROR_MESSAGE;
  return { message, errors: normalizeErrorEntries(data.errors) };
}

function getLegacyErrorDetail(data: unknown): string {
  if (!isRecord(data)) return "";
  const { detail } = data;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0 && typeof detail[0] === "string") {
    return detail[0];
  }
  return "";
}

function isApiResponseShape(data: unknown): data is ApiResponse<unknown> {
  return (
    isRecord(data) &&
    typeof data.success === "boolean" &&
    typeof data.message === "string" &&
    "data" in data &&
    "errors" in data
  );
}

export function normalizeAxiosError(error: AxiosError): ApiRequestError | AxiosError {
  const status = error.response?.status;
  const raw = error.response?.data;

  const standard = parseStandardApiErrorBody(raw);
  if (standard) {
    return new ApiRequestError(standard.message, {
      errors: standard.errors,
      status,
      originalError: error,
    });
  }

  const legacy = getLegacyErrorDetail(raw).trim();
  if (legacy) {
    return new ApiRequestError(legacy, { status, originalError: error });
  }

  return error;
}

export function getRequestErrorMessage(error: unknown): string {
  if (isApiRequestError(error)) {
    const trimmed = error.message?.trim();
    if (trimmed) return trimmed;
    const first = error.errors?.find((e) => typeof e.message === "string");
    if (first?.message?.trim()) return first.message.trim();
    return DEFAULT_ERROR_MESSAGE;
  }
  if (axios.isAxiosError(error)) {
    const normalized = normalizeAxiosError(error);
    if (normalized instanceof ApiRequestError) {
      return getRequestErrorMessage(normalized);
    }
    const data = error.response?.data;
    const standard = parseStandardApiErrorBody(data);
    if (standard?.message) return standard.message;
    const legacy = getLegacyErrorDetail(data);
    const trimmed = typeof legacy === "string" ? legacy.trim() : "";
    if (trimmed) return legacy;
    return DEFAULT_ERROR_MESSAGE;
  }
  if (error instanceof Error) {
    const msg = error.message?.trim();
    return msg || DEFAULT_ERROR_MESSAGE;
  }
  return DEFAULT_ERROR_MESSAGE;
}

export function rejectIfSuccessFlagFalse(
  data: unknown,
  httpStatus: number,
): ApiRequestError | null {
  if (!isApiResponseShape(data) || data.success !== false) return null;
  return new ApiRequestError(data.message || DEFAULT_ERROR_MESSAGE, {
    errors: normalizeErrorEntries(data.errors),
    status: httpStatus,
  });
}
