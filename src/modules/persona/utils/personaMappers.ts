import type {
  EstadoPersona,
  PersonaApiDto,
  PersonaFormValues,
  PersonaPayload,
  PersonaSummary,
  RolPersona,
  TipoIdentificacion,
} from "../types/persona.types";

const NOMBRE_PERFIL_A_ROL: Record<string, RolPersona> = {
  Administrador: "Administrador",
  Usuario: "Usuario",
  Supervisor: "Supervisor",
  Comercial: "Comercial",
  Cerrador: "Cerrador",
};

const ROL_A_PERFIL_CODIGO: Record<RolPersona, string> = {
  Administrador: "admin",
  Usuario: "usuario",
  Supervisor: "supervisor",
  Comercial: "comercial",
  Cerrador: "cerrador",
};

function estadoApiToUi(estado: string): EstadoPersona {
  return estado === "1" ? "Activo" : "Inactivo";
}

function estadoUiToApi(estado: EstadoPersona): string {
  return estado === "Activo" ? "1" : "0";
}

/** PAS (backend) se muestra como PA en UI. */
export function tipoIdentificacionCodigoToUi(codigo: string | null): TipoIdentificacion {
  if (!codigo) return "CC";
  const u = codigo.toUpperCase();
  if (u === "PAS") return "PA";
  if (u === "CC" || u === "CE" || u === "NIT") return u as TipoIdentificacion;
  return "CC";
}

function tipoUiToCodigoParaApi(tipo: TipoIdentificacion): string {
  if (tipo === "PA") return "PA";
  return tipo;
}

export function mapPersonaApiToSummary(dto: PersonaApiDto): PersonaSummary {
  const tipoUi = tipoIdentificacionCodigoToUi(dto.tipo_identificacion.codigo);
  const roles = (dto.roles ?? [])
    .map((r) => NOMBRE_PERFIL_A_ROL[r.nombre])
    .filter((r): r is RolPersona => Boolean(r));
  const rolesFinal: RolPersona[] = roles.length ? roles : ["Comercial"];
  const rolPrincipal = rolesFinal[0];
  const idDocumento = `${tipoUi}: ${dto.identificacion}`;

  return {
    id: String(dto.id),
    nombre: dto.nombre_completo?.trim() || dto.email,
    idDocumento,
    rolPrincipal,
    roles: rolesFinal,
    email: dto.email,
    telefono: dto.telefono ?? "",
    estado: estadoApiToUi(dto.estado),
    sourceApi: dto,
  };
}

export function mapApiDtoToFormValues(dto: PersonaApiDto): PersonaFormValues {
  const tipoUi = tipoIdentificacionCodigoToUi(dto.tipo_identificacion.codigo);
  const roles = (dto.roles ?? [])
    .map((r) => NOMBRE_PERFIL_A_ROL[r.nombre])
    .filter((r): r is RolPersona => Boolean(r));
  const rolesFinal: RolPersona[] = roles.length ? roles : ["Comercial"];

  return {
    id: String(dto.id),
    primerNombre: dto.primer_nombre ?? "",
    segundoNombre: dto.segundo_nombre ?? "",
    primerApellido: dto.primer_apellido ?? "",
    segundoApellido: dto.segundo_apellido ?? "",
    tipoIdentificacion: tipoUi,
    numeroIdentificacion: dto.identificacion ?? "",
    correo: dto.email,
    telefono: dto.telefono ?? "",
    roles: rolesFinal,
    estado: estadoApiToUi(dto.estado),
    contrato: null,
  };
}

export function parsePersonaSummaryToFormValues(persona: PersonaSummary): PersonaFormValues {
  if (persona.sourceApi) {
    return mapApiDtoToFormValues(persona.sourceApi);
  }

  const [tipoIdentificacionRaw, numeroIdentificacionRaw] = persona.idDocumento.split(":");
  const [primerNombre = "", ...restNombre] = persona.nombre.split(" ");
  const primerApellido = restNombre.join(" ") || "";
  const tipoIdentificacion = (tipoIdentificacionRaw?.trim() || "CC") as TipoIdentificacion;

  const resolvedRoles: RolPersona[] = persona.roles?.length
    ? persona.roles
    : persona.rolPrincipal
      ? [persona.rolPrincipal]
      : ["Comercial"];

  return {
    id: persona.id,
    primerNombre,
    segundoNombre: "",
    primerApellido,
    segundoApellido: "",
    tipoIdentificacion,
    numeroIdentificacion: numeroIdentificacionRaw?.trim() || "",
    correo: persona.email,
    telefono: persona.telefono,
    roles: resolvedRoles,
    estado: persona.estado,
    contrato: null,
  };
}

/** Cuerpo JSON para POST/PATCH /personas/ (snake_case + códigos de genéricas). */
export function buildPersonaWriteBody(payload: PersonaPayload): Record<string, unknown> {
  const roles: RolPersona[] = payload.roles.length ? payload.roles : ["Comercial"];
  return {
    primer_nombre: payload.primerNombre,
    segundo_nombre: payload.segundoNombre,
    primer_apellido: payload.primerApellido,
    segundo_apellido: payload.segundoApellido,
    email: payload.correo,
    telefono: payload.telefono || null,
    identificacion: payload.numeroIdentificacion,
    estado: estadoUiToApi(payload.estado),
    tipo_identificacion_codigo: tipoUiToCodigoParaApi(payload.tipoIdentificacion),
    roles_codigos: roles.map((r) => ROL_A_PERFIL_CODIGO[r]),
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
    rolPrincipal: payload.roles[0] ?? "Comercial",
    roles: payload.roles.length ? payload.roles : ["Comercial"],
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
