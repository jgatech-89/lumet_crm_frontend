export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: number;
  tipo_identificacion: string;
  identificacion: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  correo_auth: string | null;
  telefono: string | null;
  perfil: string;
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
