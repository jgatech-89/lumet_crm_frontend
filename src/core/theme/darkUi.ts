/**
 * Tokens modo oscuro — referencia Linear / Vercel: negro profundo, superficies elevadas,
 * bordes sutiles y alto contraste sin grises “barro”.
 * Primary global: ver `theme.ts` (#2196f3 en light y dark).
 */
export const darkUi = {
  bg: "#09090B",
  surface: "#18181B",
  surfaceHover: "#1F1F23",
  border: "#27272A",
  borderHover: "#3F3F46",
  textPrimary: "#FAFAFA",
  /** Texto secundario — un poco más visible */
  textSecondary: "#9CA3AF",
  divider: "rgba(255, 255, 255, 0.08)",
  /** Inputs — slate suave (sin negro puro), integrado al fondo */
  inputBg: "#0F172A",
  inputBgHover: "#131d33",
  inputBorder: "#1E293B",
  inputBorderHover: "#334155",
  inputText: "#E2E8F0",
  /** Alineado con palette.primary.main (#2196f3) */
  inputFocusBorder: "#2196f3",
  inputFocusShadow: "0 0 0 1px rgba(33, 150, 243, 0.3)",
  /** Callout informativo login */
  loginInfoBg: "#1E3A8A",
  loginInfoBorder: "#2196f3",
  loginInfoText: "#E0F2FE",
} as const;
