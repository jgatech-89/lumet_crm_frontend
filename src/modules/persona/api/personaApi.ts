import { apiClient, ApiRequestError } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";
import type { PersonaApiDto, PersonaPayload, PersonaSummary } from "@/modules/persona/types/persona.types";
import {
  buildPersonaWriteBody,
  mapPersonaApiToSummary,
} from "@/modules/persona/utils/personaMappers";

const PERSONAS_PREFIX = "/personas";

type PaginatedPersonasResponse = {
  success: boolean;
  message: string;
  data: PersonaApiDto[] | { items?: PersonaApiDto[] | null } | null;
  errors: null;
};


export async function listPersonasRequest(options?: { page?: number; limit?: number }): Promise<PersonaSummary[]> {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 100;
  const { data } = await apiClient.get<PaginatedPersonasResponse>(`${PERSONAS_PREFIX}/`, {
    params: { page, limit },
  });
  if (!data.success || data.data === null) {
    throw new ApiRequestError(data.message, { errors: null, status: 200 });
  }
  const rows = Array.isArray(data.data) ? data.data : (data.data.items ?? []);
  return rows.map(mapPersonaApiToSummary);
}


export async function createPersonaRequest(payload: PersonaPayload): Promise<PersonaSummary> {
  const body = buildPersonaWriteBody(payload);
  const { data } = await apiClient.post<ApiResponse<PersonaApiDto>>(`${PERSONAS_PREFIX}/`, body);
  if (!data.success || data.data === null) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
  return mapPersonaApiToSummary(data.data);
}


export async function updatePersonaRequest(id: string, payload: PersonaPayload): Promise<PersonaSummary> {
  const body = buildPersonaWriteBody(payload);
  const { data } = await apiClient.patch<ApiResponse<PersonaApiDto>>(`${PERSONAS_PREFIX}/${id}/`, body);
  if (!data.success || data.data === null) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
  return mapPersonaApiToSummary(data.data);
}


export async function deletePersonaRequest(id: string): Promise<void> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`${PERSONAS_PREFIX}/${id}/`);
  if (data && data.success === false) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
}
