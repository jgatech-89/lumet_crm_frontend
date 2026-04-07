import axios, {
  AxiosHeaders,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  ApiRequestError,
  getRequestErrorMessage,
  isApiRequestError,
  normalizeAxiosError,
  rejectIfSuccessFlagFalse,
} from "./errors";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  updateAccessToken,
} from "../auth/tokenStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "/api";

export { ApiRequestError, isApiRequestError };
export type { ApiError, ApiResponse } from "./types";
export { getRequestErrorMessage };

function handleAuthFailure(): void {
  clearTokens();
}

const REFRESH_PATH = "/auth/token/refresh/";

/** Cliente sin interceptores: solo para refresh, evita bucles. */
const bareClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string> | null = null;

async function performRefresh(): Promise<string> {
  const refresh = getRefreshToken();
  if (!refresh) {
    handleAuthFailure();
    throw new Error("Sin refresh token");
  }

  const { data } = await bareClient.post<{
    access: string;
    refresh?: string;
  }>(REFRESH_PATH, { refresh });

  if (data.refresh) {
    setTokens(data.access, data.refresh);
  } else {
    updateAccessToken(data.access);
  }
  return data.access;
}

function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const rejected = rejectIfSuccessFlagFalse(response.data, response.status);
    if (rejected) return Promise.reject(rejected);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest | undefined;
    const status = error.response?.status;

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes(REFRESH_PATH)
    ) {
      return Promise.reject(normalizeAxiosError(error));
    }

    if (!getRefreshToken()) {
      handleAuthFailure();
      return Promise.reject(normalizeAxiosError(error));
    }

    originalRequest._retry = true;

    try {
      const newAccess = await refreshAccessToken();
      if (!originalRequest.headers) {
        originalRequest.headers = new AxiosHeaders();
      }
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return apiClient(originalRequest);
    } catch {
      handleAuthFailure();
      return Promise.reject(normalizeAxiosError(error));
    }
  },
);
