export type TipoIdentificacion = "CC" | "CE" | "PA" | "NIT";

export type RolPersona = "Administrador" | "Usuario" | "Supervisor" | "Comercial" | "Cerrador";

export type EstadoPersona = "Activo" | "Inactivo";

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

export interface PersonaSummary {
  id: string;
  nombre: string;
  idDocumento: string;
  rolPrincipal?: RolPersona;
  roles?: RolPersona[];
  rol?: RolPersona;
  email: string;
  telefono: string;
  estado: EstadoPersona;
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
