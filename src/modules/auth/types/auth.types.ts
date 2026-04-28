export interface AuthTokens {
  access: string;
  refresh: string;
}

/** Coincide con `ValorGenericaListSerializer` en `/auth/me/`. */
export interface AuthUserRole {
  id: number;
  nombre: string;
  codigo: string;
  fecha_creacion?: string;
  valor_orden?: number;
  valora?: string | null;
}

export interface AuthUser {
  id: number;
  tipo_identificacion: AuthUserRole;
  identificacion: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  correo_auth: string | null;
  telefono: string | null;
  roles: AuthUserRole[];
  perfil_activo_id: number | null;
  perfil_activo: AuthUserRole | null;
  estado: string;
  verificado: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface VerifyCodePayload {
  email: string;
  codigo: string;
}

export interface ForgotPasswordRequestPayload {
  email: string;
}

export interface ForgotPasswordVerifyPayload {
  email: string;
  codigo: string;
}

export interface ForgotPasswordSetPayload {
  token: string;
  new_password: string;
}

export type AuthScreenStep =
  | "credentials"
  | "otp"
  | "forgot-email"
  | "forgot-otp"
  | "forgot-new-password";
