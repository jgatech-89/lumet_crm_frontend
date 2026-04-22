import { apiClient } from "@/core/api/client";
import type { Generica } from "../types/genericas.types";
import type { ApiResponse } from "@/core/api/types";
import type { CreateGenericaPayload } from "./genericasApi.types";

export async function listGenericasRequest() {
  const response = await apiClient.get<ApiResponse<Generica[]>>("/genericas/");
  const { data, pagination } = response.data;
  console.log(data);
  console.log(pagination);
  return {
    data: data ?? [],
    pagination: pagination ?? null,
  };
}

export async function createGenericaRequest(payload: CreateGenericaPayload): Promise<string> {
  const { data } = await apiClient.post<ApiResponse<void>>("/genericas/", {
    nombre: payload.nombre.trim(),
    descripcion: payload.descripcion?.trim() || "",
  });
  return data.message;
}
