import { apiClient } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";

export async function createPermisoGenericaRequest(payload: {
  principal: number;
  secundario: number;
}): Promise<string> {
  const { data } = await apiClient.post<ApiResponse<void>>(
    "/genericas/permisos-genericas/crear/",
    { principal: payload.principal, secundario: payload.secundario },
  );
  return data.message;
}

export async function deletePermisoGenericaRequest(permisoId: number): Promise<string> {
  const { data } = await apiClient.delete<ApiResponse<unknown>>(
    `/genericas/permisos-genericas/${permisoId}/eliminar/`,
  );
  return data.message;
}
