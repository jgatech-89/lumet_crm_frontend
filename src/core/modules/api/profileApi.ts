import { apiClient } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";
import type { AuthUserRole } from "@/modules/auth/types/auth.types";

export type MeProfilesPayload = {
  perfil: AuthUserRole | null;
  perfiles: AuthUserRole[];
};

export async function fetchMeProfilesRequest(): Promise<ApiResponse<MeProfilesPayload>> {
  const { data } = await apiClient.get<ApiResponse<MeProfilesPayload>>("/personas/me/perfiles/");
  return data;
}

export async function patchMeProfileRequest(
  perfilId: number,
): Promise<ApiResponse<MeProfilesPayload>> {
  const { data } = await apiClient.patch<ApiResponse<MeProfilesPayload>>(
    "/personas/me/perfil/",
    { perfil_id: perfilId },
  );
  return data;
}
