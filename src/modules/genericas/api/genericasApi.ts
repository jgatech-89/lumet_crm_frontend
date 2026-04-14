import { apiClient } from "@/core/api/client";
import type { Generica } from "../types/genericas.types";

type PaginatedApiResponse<T> = {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      next: string | null;
      previous: string | null;
    };
  };
  errors: null;
};

export async function listGenericasRequest(): Promise<Generica[]> {
  const { data } = await apiClient.get<PaginatedApiResponse<Generica>>("/genericas/");
  return data.data.items;
}
