import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useState, type ReactNode } from "react";

import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { LoadingButton } from "@/modules/general";

import { ConfirmCodeForm } from "../components/ConfirmCodeForm";
import { LoginForm } from "../components/LoginForm";
import { LoginLeftPanel } from "../components/LoginLeftPanel";
import { Logo } from "../components/Logo";
import { VisibilityIcon, VisibilityOffIcon } from "../components/PasswordVisibilityIcons";
import { useLoginScreen } from "../hooks/useLoginScreen";

import { formAnimationSx, inputSx, linkButtonSx, primaryButtonSx } from "../styles/loginScreenStyles";

export function LoginPage() {
  const {
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
    clearApiFieldErrors,
    authAlert,
    dismissAuthAlert,
    credentialLoading,
    otpLoading,
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
  } = useLoginScreen();

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const alertBlock =
    authAlert != null ? (
      <Alert
        severity={authAlert.severity}
        onClose={dismissAuthAlert}
        sx={{ mb: 2, width: "100%", maxWidth: 460, mx: "auto" }}
      >
        {authAlert.message}
      </Alert>
    ) : null;

  let right: ReactNode;

  switch (step) {
    case "credentials":
      right = (
        <Stack alignItems="center" sx={{ width: "100%" }}>
          {alertBlock}
          <LoginForm
            onSubmit={submitCredentials}
            isLoading={credentialLoading}
            onForgotPassword={startForgotPassword}
            apiFieldErrors={apiFieldErrors}
          />
        </Stack>
      );
      break;

    case "otp":
      right = (
        <Stack alignItems="center" sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: 460, mx: "auto", mb: 1 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={goToCredentials}
              sx={linkButtonSx}
            >
              ← Volver al inicio de sesión
            </Link>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={goToForgotEmailRequestClean}
              sx={[linkButtonSx, { display: "block", mt: 1 }] as SxProps<Theme>}
            >
              Cambiar correo
            </Link>
          </Box>
          {alertBlock}
          <ConfirmCodeForm
            email={loginCorreoAuthDisplay || loginEmail}
            onSubmit={({ code }) => void submitOtp(code)}
            onResendCode={resendLoginCode}
            isLoading={otpLoading}
            apiFieldErrors={apiFieldErrors}
            onClearApiErrors={clearApiFieldErrors}
          />
        </Stack>
      );
      break;

    case "forgot-email":
      right = (
        <Stack alignItems="center" sx={{ width: "100%" }}>
          {alertBlock}
          <Box
            component="form"
            onSubmit={submitForgotEmail}
            noValidate
            sx={formAnimationSx}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1.5,
                fontSize: { xs: "1.35rem", sm: "1.7rem" },
              }}
            >
              Recuperar contraseña
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ingresa tu correo y te enviaremos un código para restablecer la contraseña.
            </Typography>
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              margin="normal"
              error={!!apiFieldErrors?.find((e) => e.field === "email")?.message}
              helperText={apiFieldErrors?.find((e) => e.field === "email")?.message || ""}
              sx={inputSx}
              required
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={forgotRequestLoading}
              loadingLabel="Enviando..."
              sx={{ ...primaryButtonSx, mt: 2 }}
            >
              Enviar código
            </LoadingButton>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={goToCredentials}
              sx={[linkButtonSx, { display: "block", mt: 2 }] as SxProps<Theme>}
            >
              Volver al inicio de sesión
            </Link>
          </Box>
        </Stack>
      );
      break;

    case "forgot-otp":
      right = (
        <Stack alignItems="center" sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: 460, mx: "auto", mb: 1 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={goToCredentials}
              sx={linkButtonSx}
            >
              ← Volver al inicio de sesión
            </Link>
          </Box>
          {alertBlock}
          <ConfirmCodeForm
            email={forgotCorreoAuthDisplay || forgotEmail}
            onSubmit={({ code }) => void submitForgotOtp(code)}
            onResendCode={resendForgotCode}
            isLoading={forgotOtpLoading}
            apiFieldErrors={apiFieldErrors}
            onClearApiErrors={clearApiFieldErrors}
          />
        </Stack>
      );
      break;

    case "forgot-new-password":
      right = (
        <Stack alignItems="center" sx={{ width: "100%" }}>
          {alertBlock}
          <Box
            component="form"
            onSubmit={submitNewPassword}
            noValidate
            sx={formAnimationSx}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1.5,
                fontSize: { xs: "1.35rem", sm: "1.7rem" },
              }}
            >
              Nueva contraseña
            </Typography>
            <TextField
              fullWidth
              label="Nueva contraseña"
              type={showNewPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              error={
                Boolean(fieldError) ||
                !!apiFieldErrors?.find((e) => e.field === "new_password")?.message ||
                !!apiFieldErrors?.find((e) => e.field === "password")?.message
              }
              helperText={
                apiFieldErrors?.find((e) => e.field === "new_password")?.message ||
                apiFieldErrors?.find((e) => e.field === "password")?.message ||
                fieldError ||
                ""
              }
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showNewPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowNewPass((p) => !p)}
                      edge="end"
                      size="small"
                      sx={{ color: "primary.main" }}
                    >
                      {showNewPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type={showConfirmPass ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              error={!!apiFieldErrors?.find((e) => e.field === "confirm_password")?.message}
              helperText={apiFieldErrors?.find((e) => e.field === "confirm_password")?.message || ""}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirmPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowConfirmPass((p) => !p)}
                      edge="end"
                      size="small"
                      sx={{ color: "primary.main" }}
                    >
                      {showConfirmPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={forgotSetLoading}
              loadingLabel="Guardando..."
              sx={{ ...primaryButtonSx, mt: 2 }}
            >
              Guardar contraseña
            </LoadingButton>
          </Box>
        </Stack>
      );
      break;

    default:
      right = null;
  }

  return (
    <AuthLayout
      headerStart={<Logo />}
      left={<LoginLeftPanel />}
      right={
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 2 }}>
          {right}
        </Box>
      }
    />
  );
}
