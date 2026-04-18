import { AxiosHeaders } from "axios";
import { apiClient, ApiRequestError } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";
import { PERSONA_DEMO_SEED } from "../constants/personaSeedData";
import type { CreatePersonaResponseDto, PersonaPayload, PersonaSummary } from "../types/persona.types";
import { buildPersonaSummaryFromPayload } from "../utils/personaMappers";

const PERSONAS_PREFIX = "/personas";

/**
 * Con `VITE_PERSONA_USE_MOCK=false` se usan las rutas reales vía `apiClient`.
 * Por defecto (variable ausente o `true`) se usan datos de demostración.
 */
function usePersonaMock(): boolean {
  return import.meta.env.VITE_PERSONA_USE_MOCK !== "false";
}

async function delay(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}


// Obtener personas
export async function fetchPersonasRequest(): Promise<PersonaSummary[]> {
  if (usePersonaMock()) {
    await delay(280);
    return PERSONA_DEMO_SEED.map((p) => ({ ...p }));
  }
  const { data } = await apiClient.get<ApiResponse<PersonaSummary[]>>(`${PERSONAS_PREFIX}/`);
  if (!data.success || data.data === null) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
  return data.data;
}


// Crear persona y editar persona
export async function createPersonaRequest(
  payload: PersonaPayload,
  formData: FormData,
): Promise<PersonaSummary> {
  if (usePersonaMock()) {
    void formData;
    await delay(450);
    const id = payload.id ?? crypto.randomUUID();
    return buildPersonaSummaryFromPayload(payload, id);
  }
  const headers = new AxiosHeaders();
  headers.delete("Content-Type");
  const { data } = await apiClient.post<ApiResponse<CreatePersonaResponseDto | PersonaSummary>>(
    `${PERSONAS_PREFIX}/`,
    formData,
    { headers },
  );
  if (!data.success || data.data === null) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
  const body = data.data;
  if (
    typeof body === "object" &&
    body !== null &&
    "nombre" in body &&
    "idDocumento" in body &&
    typeof (body as PersonaSummary).nombre === "string"
  ) {
    return body as PersonaSummary;
  }

  const dto = body as CreatePersonaResponseDto;
  return buildPersonaSummaryFromPayload(payload, dto.id);
}


// Eliminar persona
export async function deletePersonaRequest(id: string): Promise<void> {
  if (usePersonaMock()) {
    await delay(400);
    return;
  }
  const { data } = await apiClient.delete<ApiResponse<null>>(`${PERSONAS_PREFIX}/${id}/`);
  if (data && data.success === false) {
    throw new ApiRequestError(data.message, { errors: data.errors, status: 200 });
  }
}
