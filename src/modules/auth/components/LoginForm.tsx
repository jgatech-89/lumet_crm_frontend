import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/shared/ui/LoadingButton";

import { darkUi } from "@/core/theme/darkUi";

import type { ApiError } from "@/core/api/types";

import type { LoginCredentials } from "../types/auth.types";
import { formAnimationSx, inputSx, linkButtonSx, primaryButtonSx } from "../styles/loginScreenStyles";
import { VisibilityIcon, VisibilityOffIcon } from "./PasswordVisibilityIcons";

export interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void | Promise<void>;
  isLoading: boolean;
  onForgotPassword: () => void;
  /** Errores por campo devueltos por la API (validación). */
  apiFieldErrors?: ApiError[] | null;
}

export function LoginForm({
  onSubmit,
  isLoading,
  onForgotPassword,
  apiFieldErrors,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={formAnimationSx}
    >
      <Typography
        component="h1"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          mb: 1.5,
          whiteSpace: "nowrap",
          fontSize: { xs: "1.35rem", sm: "1.7rem" },
        }}
      >
        Iniciar sesión en tu cuenta
      </Typography>

      <Box
        sx={(theme) =>
          theme.palette.mode === "dark"
            ? {
                mb: 3,
                p: 1.5,
                borderRadius: 2,
                border: `1px solid ${darkUi.loginInfoBorder}`,
                bgcolor: darkUi.loginInfoBg,
                color: darkUi.loginInfoText,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.2)",
              }
            : {
                mb: 3,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }
        }
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "primary.main",
            flexShrink: 0,
          }}
        />
        <Typography variant="body2" sx={{ color: "inherit" }}>
          Recuerda que para autenticarte debes ingresar con el correo electrónico.
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        margin="normal"
        size="medium"
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo no válido",
          },
        })}
        error={Boolean(errors.email) || !!apiFieldErrors?.find((e) => e.field === "email")?.message}
        helperText={
          apiFieldErrors?.find((e) => e.field === "email")?.message || errors.email?.message || ""
        }
        inputProps={{ "aria-label": "Correo electrónico" }}
        sx={inputSx}
      />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          margin="normal"
          size="medium"
          {...register("password", { required: "La contraseña es obligatoria" })}
          error={Boolean(errors.password) || !!apiFieldErrors?.find((e) => e.field === "password")?.message}
          helperText={
            apiFieldErrors?.find((e) => e.field === "password")?.message ||
            errors.password?.message ||
            ""
          }
          inputProps={{ "aria-label": "Contraseña" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                  size="small"
                  sx={{ color: "primary.main" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />
      </Box>

      <Link
        component="button"
        type="button"
        variant="body2"
        onClick={() => onForgotPassword?.()}
        sx={[linkButtonSx, { display: "block", mt: 2.5, mb: 2 }] as SxProps<Theme>}
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        loading={isLoading}
        loadingLabel="Entrando..."
        sx={primaryButtonSx}
      >
        Iniciar sesión
      </LoadingButton>
    </Box>
  );
}
