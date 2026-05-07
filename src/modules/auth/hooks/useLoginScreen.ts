import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRequestErrorMessage, isApiRequestError } from "@/core/api/client";
import type { ApiError } from "@/core/api/types";
import { useAuth } from "@/core/auth/useAuth";
import { useSnackbar } from "@/shared/context/SnackbarContext";

import {
  forgotPasswordRequest,
  forgotPasswordSetRequest,
  forgotPasswordVerifyRequest,
  loginRequest,
  resendCodeRequest,
  verifyCodeRequest,
} from "../api/authApi";
import type { AuthScreenStep, LoginCredentials } from "../types/auth.types";

export type AuthAlertSeverity = "error";

export interface AuthAlertState {
  severity: AuthAlertSeverity;
  message: string;
}

export function useLoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useSnackbar();

  const [authAlert, setAuthAlert] = useState<AuthAlertState | null>(null);

  const showAuthAlert = useCallback((severity: AuthAlertSeverity, message: string) => {
    setAuthAlert({ severity, message });
  }, []);

  const showAuthError = useCallback(
    (message: string) => {
      showAuthAlert("error", message);
      showError(message);
    },
    [showAuthAlert, showError],
  );

  const dismissAuthAlert = useCallback(() => {
    setAuthAlert(null);
  }, []);

  const [step, setStep] = useState<AuthScreenStep>("credentials");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginCorreoAuthDisplay, setLoginCorreoAuthDisplay] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCorreoAuthDisplay, setForgotCorreoAuthDisplay] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [apiFieldErrors, setApiFieldErrors] = useState<ApiError[]>([]);

  const [credentialLoading, setCredentialLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [forgotRequestLoading, setForgotRequestLoading] = useState(false);
  const [forgotOtpLoading, setForgotOtpLoading] = useState(false);
  const [forgotSetLoading, setForgotSetLoading] = useState(false);

  const goToOtp = useCallback(
    (email: string, correoAuthDisplay?: string | null) => {
      dismissAuthAlert();
      setLoginEmail(email);
      setLoginCorreoAuthDisplay(correoAuthDisplay?.trim() ?? "");
      setStep("otp");
      setFieldError("");
      setApiFieldErrors([]);
    },
    [dismissAuthAlert],
  );

  const goToCredentials = useCallback(() => {
    dismissAuthAlert();
    setStep("credentials");
    setFieldError("");
    setApiFieldErrors([]);
    setLoginCorreoAuthDisplay("");
    setForgotEmail("");
    setForgotCorreoAuthDisplay("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
  }, [dismissAuthAlert]);

  const goToForgotEmailRequestClean = useCallback(() => {
    dismissAuthAlert();
    setStep("forgot-email");
    setForgotEmail("");
    setForgotCorreoAuthDisplay("");
    setFieldError("");
    setApiFieldErrors([]);
  }, [dismissAuthAlert]);

  const submitCredentials = useCallback(
    async (data: LoginCredentials) => {
      dismissAuthAlert();
      setApiFieldErrors([]);
      setCredentialLoading(true);
      try {
        const res = await loginRequest(data);
        const requiresOtp = res.data?.requires_otp !== false;
        if (!requiresOtp) {
          const tokens = res.data?.tokens;
          if (!tokens?.access || !tokens?.refresh) {
            showAuthError("No se pudieron obtener los tokens de sesión.");
            return;
          }
          await login(tokens);
          showSuccess(res.message || "Sesión iniciada");
          navigate("/", { replace: true });
          return;
        }
        const masked = res.data?.correo_auth?.trim() ?? "";
        if (masked) setLoginCorreoAuthDisplay(masked);
        showSuccess(res.message || "Código enviado");
        goToOtp(data.email, masked || undefined);
      } catch (e) {
        if (isApiRequestError(e)) setApiFieldErrors(e.errors ?? []);
        else setApiFieldErrors([]);
        showAuthError(getRequestErrorMessage(e));
      } finally {
        setCredentialLoading(false);
      }
    },
    [dismissAuthAlert, goToOtp, login, navigate, showAuthError, showSuccess],
  );

  const submitOtp = useCallback(
    async (codeOverride?: string) => {
      const code = (codeOverride ?? "").trim();
      if (code.length !== 6) {
        showAuthError("Introduce el código de 6 dígitos.");
        return;
      }
      dismissAuthAlert();
      setApiFieldErrors([]);
      setOtpLoading(true);
      try {
        const res = await verifyCodeRequest({
          email: loginEmail,
          codigo: code,
        });
        if (!res.data) {
          showAuthError(res.message || "No se pudieron obtener los tokens");
          return;
        }
        await login(res.data);
        showSuccess(res.message || "Sesión iniciada");
        navigate("/", { replace: true });
      } catch (e) {
        if (isApiRequestError(e)) setApiFieldErrors(e.errors ?? []);
        else setApiFieldErrors([]);
        showAuthError(getRequestErrorMessage(e));
      } finally {
        setOtpLoading(false);
      }
    },
    [dismissAuthAlert, login, loginEmail, navigate, showAuthError, showSuccess],
  );

  const resendLoginCode = useCallback(async () => {
    if (!loginEmail || resendLoading) return;
    dismissAuthAlert();
    setResendLoading(true);
    try {
      const res = await resendCodeRequest(loginEmail);
      const masked = res.data?.correo_auth?.trim();
      if (masked) setLoginCorreoAuthDisplay(masked);
      showSuccess(res.message || "Solicitud de reenvío enviada");
    } catch (e) {
      if (isApiRequestError(e)) setApiFieldErrors(e.errors ?? []);
      else setApiFieldErrors([]);
      showAuthError(getRequestErrorMessage(e));
    } finally {
      setResendLoading(false);
    }
  }, [dismissAuthAlert, loginEmail, resendLoading, showAuthError, showSuccess]);

  const startForgotPassword = useCallback(() => {
    dismissAuthAlert();
    setStep("forgot-email");
    setForgotEmail(loginEmail);
    setFieldError("");
    setApiFieldErrors([]);
  }, [dismissAuthAlert, loginEmail]);

  const submitForgotEmail = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFieldError("");
      setApiFieldErrors([]);
      const email = forgotEmail.trim().toLowerCase();
      if (!email) {
        showAuthError("Ingresa tu correo electrónico.");
        return;
      }
      dismissAuthAlert();
      setForgotEmail(email);
      setForgotRequestLoading(true);
      try {
        const res = await forgotPasswordRequest({ email });
        const masked = res.data?.correo_auth?.trim();
        if (masked) setForgotCorreoAuthDisplay(masked);
        showSuccess(res.message || "Revisa tu correo");
        setStep("forgot-otp");
      } catch (err) {
        if (isApiRequestError(err)) setApiFieldErrors(err.errors ?? []);
        else setApiFieldErrors([]);
        showAuthError(getRequestErrorMessage(err));
      } finally {
        setForgotRequestLoading(false);
      }
    },
    [dismissAuthAlert, forgotEmail, showAuthError, showSuccess],
  );

  const submitForgotOtp = useCallback(
    async (codeOverride?: string) => {
      const code = (codeOverride ?? "").trim();
      if (code.length !== 6) {
        showAuthError("Introduce el código de 6 dígitos.");
        return;
      }
      dismissAuthAlert();
      setApiFieldErrors([]);
      setForgotOtpLoading(true);
      try {
        const res = await forgotPasswordVerifyRequest({
          email: forgotEmail.trim(),
          codigo: code,
        });
        const payload = res.data;
        if (!payload?.token) {
          showAuthError(res.message || "Código inválido");
          return;
        }
        setResetToken(payload.token);
        setStep("forgot-new-password");
        setNewPassword("");
        setConfirmPassword("");
        setFieldError("");
      } catch (e) {
        if (isApiRequestError(e)) setApiFieldErrors(e.errors ?? []);
        else setApiFieldErrors([]);
        showAuthError(getRequestErrorMessage(e));
      } finally {
        setForgotOtpLoading(false);
      }
    },
    [dismissAuthAlert, forgotEmail, showAuthError],
  );

  const submitNewPassword = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dismissAuthAlert();
      setFieldError("");
      setApiFieldErrors([]);
      const pass = (newPassword ?? "").trim();
      const conf = (confirmPassword ?? "").trim();
      if (!pass) {
        setFieldError("La contraseña es obligatoria.");
        return;
      }
      if (pass.length < 8) {
        setFieldError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }
      if (pass !== conf) {
        setFieldError("Las contraseñas no coinciden.");
        return;
      }
      if (!resetToken) {
        showAuthError("Sesión de recuperación expirada. Solicita nuevamente el código.");
        return;
      }
      setForgotSetLoading(true);
      try {
        const res = await forgotPasswordSetRequest({
          token: resetToken,
          new_password: pass,
        });
        showSuccess(res.message || "Contraseña actualizada");
        window.setTimeout(() => {
          goToCredentials();
        }, 1500);
      } catch (err) {
        if (isApiRequestError(err)) setApiFieldErrors(err.errors ?? []);
        else setApiFieldErrors([]);
        showAuthError(getRequestErrorMessage(err));
      } finally {
        setForgotSetLoading(false);
      }
    },
    [
      confirmPassword,
      dismissAuthAlert,
      goToCredentials,
      newPassword,
      resetToken,
      showAuthError,
      showSuccess,
    ],
  );

  const resendForgotCode = useCallback(async () => {
    const email = forgotEmail.trim();
    if (!email || resendLoading) return;
    dismissAuthAlert();
    setResendLoading(true);
    try {
      const res = await resendCodeRequest(email);
      const masked = res.data?.correo_auth?.trim();
      if (masked) setForgotCorreoAuthDisplay(masked);
      showSuccess(res.message || "Solicitud de reenvío enviada");
    } catch (e) {
      if (isApiRequestError(e)) setApiFieldErrors(e.errors ?? []);
      else setApiFieldErrors([]);
      showAuthError(getRequestErrorMessage(e));
    } finally {
      setResendLoading(false);
    }
  }, [dismissAuthAlert, forgotEmail, resendLoading, showAuthError, showSuccess]);

  return {
    step,
    loginEmail,
    loginCorreoAuthDisplay,
    forgotEmail,
    setForgotEmail,
    forgotCorreoAuthDisplay,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    fieldError,
    apiFieldErrors,
    clearApiFieldErrors: () => setApiFieldErrors([]),
    authAlert,
    dismissAuthAlert,
    credentialLoading,
    otpLoading,
    resendLoading,
    forgotRequestLoading,
    forgotOtpLoading,
    forgotSetLoading,
    goToCredentials,
    goToForgotEmailRequestClean,
    submitCredentials,
    submitOtp,
    resendLoginCode,
    startForgotPassword,
    submitForgotEmail,
    submitForgotOtp,
    submitNewPassword,
    resendForgotCode,
  };
}
