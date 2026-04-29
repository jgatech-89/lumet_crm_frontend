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

export type CorreoAuthResponse = {
  correo_auth?: string | null;
};

const AUTH_PREFIX = "/auth";

export async function loginRequest(body: LoginCredentials): Promise<ApiResponse<CorreoAuthResponse>> {
  const { data } = await apiClient.post<ApiResponse<CorreoAuthResponse>>(`${AUTH_PREFIX}/login/`, body);
  return data;
}

export async function verifyCodeRequest(body: VerifyCodePayload): Promise<ApiResponse<AuthTokens>> {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>(`${AUTH_PREFIX}/verify-otp/`, {
    email: body.email,
    otp: body.codigo,
  });
  return data;
}

export async function resendCodeRequest(email: string): Promise<ApiResponse<CorreoAuthResponse>> {
  const { data } = await apiClient.post<ApiResponse<CorreoAuthResponse>>(`${AUTH_PREFIX}/resend-code/`, {
    email,
  });
  return data;
}

export async function fetchMeRequest(): Promise<ApiResponse<AuthUser>> {
  const { data } = await apiClient.get<ApiResponse<AuthUser>>(`${AUTH_PREFIX}/me/`);
  return data;
}

export async function forgotPasswordRequest(
  body: ForgotPasswordRequestPayload,
): Promise<ApiResponse<CorreoAuthResponse>> {
  const { data } = await apiClient.post<ApiResponse<CorreoAuthResponse>>(
    `${AUTH_PREFIX}/forgot-password/request/`,
    body,
  );
  return data;
}

export async function forgotPasswordVerifyRequest(
  body: ForgotPasswordVerifyPayload,
): Promise<ApiResponse<{ token: string }>> {
  const { data } = await apiClient.post<ApiResponse<{ token: string }>>(
    `${AUTH_PREFIX}/forgot-password/verify/`,
    { email: body.email, code: body.codigo },
  );
  return data;
}

export async function forgotPasswordSetRequest(
  body: ForgotPasswordSetPayload,
): Promise<ApiResponse<CorreoAuthResponse>> {
  const { data } = await apiClient.post<ApiResponse<CorreoAuthResponse>>(
    `${AUTH_PREFIX}/forgot-password/set/`,
    body,
  );
  return data;
}
