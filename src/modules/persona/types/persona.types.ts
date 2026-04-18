export type TipoIdentificacion = "CC" | "CE" | "PA";
export type RolPersona = "Administrador" | "Supervisor" | "Comercial" | "Cerrador";
export type EstadoPersona = "Activo" | "Inactivo";

export interface PersonaSummary {
  id: string;
  nombre: string;
  idDocumento: string;
  rol: RolPersona;
  email: string;
  telefono: string;
  estado: EstadoPersona;
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
  rol: RolPersona;
  estado: EstadoPersona;
  contrato: File | null;
}

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
  rol: RolPersona;
  estado: EstadoPersona;
  contrato?: File;
}

/** Respuesta esperada del backend al crear persona (ajusta campos cuando exista contrato real). */
export interface CreatePersonaResponseDto {
  id: string;
  primerNombre?: string;
  primerApellido?: string;
  email?: string;
  rol?: string;
  estado?: string;
  createdAt?: string;
}
