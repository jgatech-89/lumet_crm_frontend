import { apiClient } from "@/core/api/client";
import type { Generica, ValorGenerica } from "../types/genericas.types";
import type { ApiResponse } from "@/core/api/types";
import type { CreateGenericaPayload, ListGenericasParams, ListValoresGenericaParams, UpdateGenericaPayload } from "./genericasApi.types";


export async function listGenericasRequest(params: ListGenericasParams) {
  const response = await apiClient.get<ApiResponse<Generica[]>>("/genericas/", {
    params: {
      page: params.page,
    },
  });
  const { data, pagination } = response.data;
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

export async function updateGenericaRequest(payload: UpdateGenericaPayload): Promise<string> {
  const { data } = await apiClient.put<ApiResponse<void>>(`/genericas/${payload.id}/`,
    { nombre: payload.nombre.trim(), descripcion: payload.descripcion?.trim() || "" }
  );
  return data.message;
}

export async function listValoresGenericaRequest(params: ListValoresGenericaParams) {
  const response = await apiClient.get<ApiResponse<ValorGenerica[]>>("/genericas/valores-genericas/", {
    params: {
      generica: params.generica,
    },
  });
  const { data } = response.data;
  console.log(data);
  return {
    data: data ?? [],
  };
}