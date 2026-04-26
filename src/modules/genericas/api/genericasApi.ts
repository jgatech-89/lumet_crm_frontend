import { apiClient } from "@/core/api/client";
import type {
  Generica,
  ValorGenerica,
  ValorGenericaConPermiso,
  ValorGenericaDetail,
} from "../types/genericas.types";
import type { ApiResponse } from "@/core/api/types";
import type {
  CreateGenericaPayload,
  ListGenericasParams,
  ListValoresGenericaParams,
  UpdateGenericaPayload,
  UpdateValorGenericaPayload,
} from "./genericasApi.types";

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

export async function listAllGenericasRequest(): Promise<Generica[]> {
  const response = await apiClient.get<ApiResponse<Generica[]>>("/genericas/", {
    params: { sin_paginacion: 1 },
  });
  return response.data.data ?? [];
}

export async function listValoresGenericaConPermisoRequest(params: {
  principalId: number;
  genericaId: number;
}): Promise<ValorGenericaConPermiso[]> {
  const { principalId, genericaId } = params;
  const response = await apiClient.get<ApiResponse<ValorGenericaConPermiso[]>>(
    `/genericas/valores-genericas/principal/${principalId}/con-permiso/`,
    { params: { generica: genericaId } },
  );
  return response.data.data ?? [];
}

export { createPermisoGenericaRequest, deletePermisoGenericaRequest } from "./permisosGenericaApi";

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
  return {
    data: data ?? [],
  };
}

export async function getValorGenericaDetailRequest(id: number){
  const response = await apiClient.get<ApiResponse<ValorGenericaDetail | null>>(
    `/genericas/valores-genericas/${id}/`
  );
  const { data } = response.data;
  return data;
}

export async function deleteValorGenericaRequest(id: number): Promise<string> {
  const { data } = await apiClient.delete<ApiResponse<unknown>>(
    `/genericas/valores-genericas/${id}/`,
  );
  return data.message;
}

export async function createValorGenericaRequest(
  fields: Record<string, string | number | null>,
  archivo?: File | null,
): Promise<string> {
  const url = "/genericas/valores-genericas/";
  if (archivo) {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      fd.append(k, String(v));
    });
    fd.append("archivo", archivo);
    const { data } = await apiClient.post<ApiResponse<void>>(url, fd);
    return data.message;
  }
  const { data } = await apiClient.post<ApiResponse<void>>(url, fields);
  return data.message;
}

export async function updateValorGenericaRequest(payload: UpdateValorGenericaPayload): Promise<string> {
  const { id, fields, archivo } = payload;
  const url = `/genericas/valores-genericas/${id}/`;
  if (archivo) {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      fd.append(k, String(v));
    });
    fd.append("archivo", archivo);
    const { data } = await apiClient.put<ApiResponse<void>>(url, fd);
    return data.message;
  }
  const { data } = await apiClient.put<ApiResponse<void>>(url, fields);
  return data.message;
}