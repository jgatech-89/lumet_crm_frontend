import axios from "axios";

import { isApiRequestError } from "@/core/api/client";

export function isUnauthorized(error: unknown): boolean {
  if (isApiRequestError(error) && error.status === 401) return true;
  return axios.isAxiosError(error) && error.response?.status === 401;
}
