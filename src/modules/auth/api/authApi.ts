import { apiClient } from "@/core/api/client";
import type { ApiResponse } from "@/core/api/types";
import type {
  AuthTokens,
  AuthUser,
  ForgotPasswordRequestPayload,
  ForgotPasswordSetPayload,
  ForgotPasswordVerifyPayload,
  LoginCredentials,
  VerifyCodePayload,
} from "../types/auth.types";

export type AuthMessagePayload = {
  correo_auth?: string | null;
};

export type AuthMessageResponse = ApiResponse<AuthMessagePayload>;

const AUTH_PREFIX = "/auth";

export async function loginRequest(body: LoginCredentials): Promise<AuthMessageResponse> {
  const { data } = await apiClient.post<AuthMessageResponse>(`${AUTH_PREFIX}/login/`, body);
  return data;
}

export async function verifyCodeRequest(body: VerifyCodePayload): Promise<ApiResponse<AuthTokens>> {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>(`${AUTH_PREFIX}/verify-otp/`, {
    email: body.email,
    otp: body.codigo,
  });
  return data;
}

export async function resendCodeRequest(email: string): Promise<AuthMessageResponse> {
  const { data } = await apiClient.post<AuthMessageResponse>(`${AUTH_PREFIX}/resend-code/`, {
    email,
  });
  return data;
}

export async function fetchMeRequest(): Promise<AuthUser> {
  const { data } = await apiClient.get<ApiResponse<AuthUser>>(`${AUTH_PREFIX}/me/`);
  if (data.data === null) {
    throw new Error(data.message || "No se pudo cargar el usuario");
  }
  return data.data;
}

export async function forgotPasswordRequest(
  body: ForgotPasswordRequestPayload,
): Promise<AuthMessageResponse> {
  const { data } = await apiClient.post<AuthMessageResponse>(
    `${AUTH_PREFIX}/forgot-password/request/`,
    body,
  );
  return data;
}

export async function forgotPasswordVerifyRequest(body: ForgotPasswordVerifyPayload): Promise<string> {
  const { data } = await apiClient.post<ApiResponse<{ token: string }>>(
    `${AUTH_PREFIX}/forgot-password/verify/`,
    { email: body.email, code: body.codigo },
  );
  if (data.data === null || !data.data.token) {
    throw new Error(data.message || "Código inválido");
  }
  return data.data.token;
}

export async function forgotPasswordSetRequest(
  body: ForgotPasswordSetPayload,
): Promise<AuthMessageResponse> {
  const { data } = await apiClient.post<AuthMessageResponse>(
    `${AUTH_PREFIX}/forgot-password/set/`,
    body,
  );
  return data;
}
