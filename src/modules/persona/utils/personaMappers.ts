import type {
  PersonaFormValues,
  PersonaPayload,
  PersonaSummary,
  TipoIdentificacion,
} from "../types/persona.types";

export function parsePersonaSummaryToFormValues(persona: PersonaSummary): PersonaFormValues {
  const [tipoIdentificacionRaw, numeroIdentificacionRaw] = persona.idDocumento.split(":");
  const [primerNombre = "", primerApellido = ""] = persona.nombre.split(" ");
  const tipoIdentificacion = (tipoIdentificacionRaw?.trim() || "CC") as TipoIdentificacion;

  return {
    id: persona.id,
    primerNombre,
    segundoNombre: "",
    primerApellido,
    segundoApellido: "",
    tipoIdentificacion,
    numeroIdentificacion: numeroIdentificacionRaw?.trim() || "",
    correo: persona.email,
    telefono: persona.telefono.replace(/\s/g, ""),
    rol: persona.rol,
    estado: persona.estado,
    contrato: null,
  };
}

export function buildPersonaSummaryFromPayload(
  payload: PersonaPayload,
  id: string = crypto.randomUUID(),
): PersonaSummary {
  const nombre = [payload.primerNombre, payload.segundoNombre, payload.primerApellido, payload.segundoApellido]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ")
    .trim();

  const idDocumento = `${payload.tipoIdentificacion}: ${payload.numeroIdentificacion}`;

  return {
    id,
    nombre: nombre || `${payload.primerNombre} ${payload.primerApellido}`.trim(),
    idDocumento,
    rol: payload.rol,
    email: payload.correo,
    telefono: payload.telefono,
    estado: payload.estado,
  };
}

export function getPersonaDisplayInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  const first = words[0] ?? "";
  if (first.length >= 2) {
    return first.slice(0, 2).toUpperCase();
  }

  if (first.length === 1) {
    return `${first}${first}`.toUpperCase();
  }

  return "NN";
}
