import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Link, TextField, Typography, useTheme } from "@mui/material";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";

import type { ApiError } from "@/core/api/types";
import { LoadingButton } from "@/shared/ui/LoadingButton";

import { darkUi } from "@/core/theme/darkUi";

import { linkButtonSx, primaryButtonSx } from "../styles/loginScreenStyles";

const DIGIT_COUNT = 6;
const RESEND_COOLDOWN_SEC = 60;

function getInputSx(theme: Theme, hasValue: boolean) {
  const isDark = theme.palette.mode === "dark";
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: isDark ? "12px" : 2,
      bgcolor: isDark ? darkUi.inputBg : theme.palette.background.paper,
      color: isDark ? darkUi.inputText : undefined,
      width: 52,
      maxWidth: 52,
      minHeight: 56,
      textAlign: "center" as const,
      fontSize: "1.25rem",
      fontWeight: 600,
      transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
      transform: hasValue ? "scale(1.02)" : "scale(1)",
      ...(isDark
        ? {
            "&:hover:not(.Mui-focused):not(.Mui-error)": {
              bgcolor: darkUi.inputBgHover,
            },
          }
        : {}),
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: isDark ? darkUi.inputBorder : "rgba(0, 0, 0, 0.08)",
        ...(isDark ? { borderWidth: "1px" } : {}),
      },
      "&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
        borderColor: isDark ? darkUi.inputBorderHover : "rgba(0, 0, 0, 0.15)",
      },
      "&.Mui-focused:not(.Mui-error)": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: isDark ? darkUi.inputFocusBorder : theme.palette.primary.main,
          borderWidth: "1px",
        },
        transform: "scale(1.04)",
        ...(!isDark
          ? {
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`,
            }
          : {}),
      },
    },
    "& .MuiInputBase-input": {
      padding: "14px 8px",
      textAlign: "center" as const,
    },
  };
}

export interface ConfirmCodeFormProps {
  email: string;
  onSubmit: (data: { code: string }) => void;
  onResendCode: () => void;
  isLoading?: boolean;
  apiFieldErrors?: ApiError[] | null;
  onClearApiErrors?: () => void;
}

export function ConfirmCodeForm({
  email,
  onSubmit,
  onResendCode,
  isLoading = false,
  apiFieldErrors,
  onClearApiErrors,
}: ConfirmCodeFormProps) {
  const theme = useTheme();
  const [digits, setDigits] = useState(Array(DIGIT_COUNT).fill(""));
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => (c <= 0 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    onClearApiErrors?.();
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, DIGIT_COUNT).split("");
      const newDigits = [...digits];
      pasted.forEach((d, i) => {
        if (index + i < DIGIT_COUNT) newDigits[index + i] = d;
      });
      setDigits(newDigits);
      setError("");
      focusInput(Math.min(index + pasted.length, DIGIT_COUNT - 1));
      return;
    }
    const char = value.replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError("");
    if (char && index < DIGIT_COUNT - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      onClearApiErrors?.();
      focusInput(index - 1);
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      setDigits(newDigits);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== DIGIT_COUNT) {
      setError("Ingresa los 6 dígitos del código");
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setError("Solo se permiten dígitos numéricos");
      return;
    }
    setError("");
    onSubmit({ code });
  };

  const serverCodeError =
    apiFieldErrors?.find((e) => e.field === "otp")?.message ||
    apiFieldErrors?.find((e) => e.field === "codigo")?.message ||
    (apiFieldErrors?.length
      ? apiFieldErrors.find((e) => e.field === undefined || e.field === "")?.message ||
        apiFieldErrors[0]?.message ||
        ""
      : "");
  const combinedError = error || serverCodeError;

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      noValidate
      sx={{
        width: "100%",
        maxWidth: 460,
        mx: "auto",
        animation: "fadeIn 0.6s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
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
        Confirmar código
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
          Te enviamos un código de 6 dígitos al siguiente correo:
        </Typography>
        <Typography
          component="span"
          sx={{
            display: "inline-block",
            fontWeight: 600,
            color: "text.primary",
            fontSize: "0.95rem",
            mb: 1,
          }}
        >
          {email}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Ingrésalo en los recuadros de abajo.
        </Typography>
      </Box>

      <Box
        component="fieldset"
        border="none"
        padding={0}
        margin={0}
        sx={{
          display: "flex",
          gap: 1.5,
          justifyContent: "center",
          flexWrap: "nowrap",
          mb: 1,
        }}
        aria-describedby={combinedError ? "confirm-code-error" : undefined}
        aria-invalid={Boolean(combinedError)}
      >
        <Box
          component="legend"
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Código de verificación de 6 dígitos
        </Box>
        {digits.map((digit: string, index: number) => (
          <TextField
            key={index}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputProps={{
              maxLength: 6,
              inputMode: "numeric" as const,
              "aria-label": `Dígito ${index + 1} de 6`,
              autoComplete: index === 0 ? "one-time-code" : "off",
            }}
            error={Boolean(combinedError)}
            sx={getInputSx(theme, Boolean(digit))}
          />
        ))}
      </Box>
      {combinedError ? (
        <Typography
          id="confirm-code-error"
          variant="caption"
          color="error"
          role="alert"
          sx={{ display: "block", textAlign: "center", mb: 1 }}
        >
          {combinedError}
        </Typography>
      ) : null}

      <Box sx={{ mt: 2, mb: 2 }}>
        {resendCooldown > 0 ? (
          <Typography variant="body2" color="text.secondary">
            Reenviar código en {resendCooldown} s
          </Typography>
        ) : (
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => {
              onClearApiErrors?.();
              setDigits(Array(DIGIT_COUNT).fill(""));
              setError("");
              focusInput(0);
              onResendCode();
              setResendCooldown(RESEND_COOLDOWN_SEC);
            }}
            sx={[linkButtonSx, { display: "block" }] as SxProps<Theme>}
          >
            Reenviar código
          </Link>
        )}
      </Box>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        loading={isLoading}
        loadingLabel="Verificando..."
        sx={primaryButtonSx}
      >
        Confirmar
      </LoadingButton>
    </Box>
  );
}
