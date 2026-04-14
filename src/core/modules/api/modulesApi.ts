import { apiClient } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";

import type { ModulePermissionItem } from "../types";

export async function fetchModulesByProfile(perfilId: number): Promise<ModulePermissionItem[]> {
  const { data } = await apiClient.get<ApiResponse<ModulePermissionItem[]>>(
    `/personas/perfiles/${perfilId}/modulos/`,
  );

  const modules = data.data ?? [];
  return [...modules].sort((a, b) => (a.valor_orden || 0) - (b.valor_orden || 0));
}
