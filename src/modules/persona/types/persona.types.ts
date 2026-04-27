export type TipoIdentificacion = "CC" | "CE" | "PA" | "NIT";

/** Roles mostrados en UI; "Usuario" existe en catálogo backend (genérica). */
export type RolPersona = "Administrador" | "Usuario" | "Supervisor" | "Comercial" | "Cerrador";

export type EstadoPersona = "Activo" | "Inactivo";

/** Fila tal como la devuelve GET /personas/ (serializer de lectura). */
export interface ValorGenericaMiniDto {
  id: number;
  codigo: string | null;
  nombre: string;
}

export interface PersonaApiDto {
  id: number;
  tipo_identificacion: ValorGenericaMiniDto;
  identificacion: string;
  nombre_completo: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  correo_auth: string | null;
  telefono: string | null;
  roles: ValorGenericaMiniDto[];
  estado: string;
  verificado: boolean;
  created_at: string | null;
  updated_at: string | null;
}

/** Modelo de filas/tablas/detalle (camelCase, listo para componentes). */
export interface PersonaSummary {
  id: string;
  nombre: string;
  idDocumento: string;
  rolPrincipal?: RolPersona;
  roles?: RolPersona[];
  /** Compatibilidad temporal con seed/histórico de UI. */
  rol?: RolPersona;
  email: string;
  telefono: string;
  estado: EstadoPersona;
  /** Presente cuando la fila viene del API; permite reabrir el formulario sin perder campos. */
  sourceApi?: PersonaApiDto;
}

export interface PersonaFormValues {
  id?: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  correo: string;
  telefono: string;
  roles: RolPersona[];
  estado: EstadoPersona;
  contrato: File | null;
}

/** Payload del formulario hacia capa api (mapeo a snake_case / códigos en personaMappers). */
export interface PersonaPayload {
  id?: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  correo: string;
  telefono: string;
  roles: RolPersona[];
  estado: EstadoPersona;
  contrato?: File;
}
