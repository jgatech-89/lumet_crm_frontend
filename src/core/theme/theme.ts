import { createTheme } from "@mui/material/styles";

import { darkUi } from "./darkUi";

declare module "@mui/material/styles" {
  interface Palette {
    hero: {
      gradientStart: string;
      gradientEnd: string;
    };
  }
  interface PaletteOptions {
    hero?: {
      gradientStart: string;
      gradientEnd: string;
    };
  }
}

/** Primary unificado (Material Blue 500) — mismo valor en light y dark */
const PRIMARY_MAIN = "#2196f3";
const PRIMARY_LIGHT = "#42a5f5";
const PRIMARY_DARK = "#1976d2";

const autofillInputStyles = (isDark: boolean) => ({
  "& input:-webkit-autofill": {
    WebkitBoxShadow: isDark
      ? "0 0 0 1000px #0F172A inset"
      : "0 0 0 1000px #FFFFFF inset",
    WebkitTextFillColor: isDark ? "#E2E8F0" : "#111827",
    transition: "background-color 9999s ease-in-out 0s",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: isDark
      ? "0 0 0 1000px #0F172A inset"
      : "0 0 0 1000px #FFFFFF inset",
    WebkitTextFillColor: isDark ? "#E2E8F0" : "#111827",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: isDark
      ? "0 0 0 1000px #0F172A inset"
      : "0 0 0 1000px #FFFFFF inset",
    WebkitTextFillColor: isDark ? "#E2E8F0" : "#111827",
  },
  "& input:-webkit-autofill:active": {
    WebkitBoxShadow: isDark
      ? "0 0 0 1000px #0F172A inset"
      : "0 0 0 1000px #FFFFFF inset",
    WebkitTextFillColor: isDark ? "#E2E8F0" : "#111827",
  },
});

/**
 * Tema único de la app (login + resto).
 */
export function createAppTheme(mode: "light" | "dark") {
  const isDark = mode === "dark";
  const paletteWhite = "#ffffff";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: PRIMARY_MAIN,
        light: PRIMARY_LIGHT,
        dark: PRIMARY_DARK,
        contrastText: paletteWhite,
      },
      background: {
        default: isDark ? darkUi.bg : "#f8fafc",
        paper: isDark ? darkUi.surface : paletteWhite,
      },
      text: {
        primary: isDark ? darkUi.textPrimary : "#212b36",
        secondary: isDark ? darkUi.textSecondary : "#637381",
      },
      divider: isDark ? darkUi.divider : "rgba(0, 0, 0, 0.12)",
      hero: {
        gradientStart: isDark ? darkUi.surface : "#e8f0ff",
        gradientEnd: isDark ? darkUi.bg : "#f8fafc",
      },
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
        selected: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontWeight: 700,
        fontSize: "1.75rem",
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
      },
      h5: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.35 },
      body1: { fontSize: "1rem", lineHeight: 1.5, letterSpacing: "0.01em" },
      body2: { fontSize: "0.875rem", lineHeight: 1.57, letterSpacing: "0.01em" },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            ...(isDark
              ? {
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  textRendering: "optimizeLegibility",
                }
              : {}),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: isDark
            ? {
                backgroundImage: "none",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.06)",
              }
            : {},
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: PRIMARY_MAIN,
            },
            ...(isDark
              ? {
                  color: "rgba(226, 232, 240, 0.55)",
                }
              : {}),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: isDark ? "12px" : 12,
            backgroundColor: isDark ? darkUi.inputBg : paletteWhite,
            color: isDark ? darkUi.inputText : undefined,
            transition: "border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
            "&:hover": isDark
              ? {
                  backgroundColor: darkUi.inputBgHover,
                }
              : {},
            ...autofillInputStyles(isDark),
          },
          notchedOutline: isDark
            ? {
                borderColor: darkUi.inputBorder,
                borderWidth: "1px",
              }
            : {},
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: isDark ? darkUi.inputBg : paletteWhite,
              color: isDark ? darkUi.inputText : undefined,
              "& fieldset": {
                borderColor: isDark ? darkUi.inputBorder : "rgba(0,0,0,0.08)",
                borderWidth: isDark ? "1px" : undefined,
              },
              "&:hover": {
                ...(isDark ? { backgroundColor: darkUi.inputBgHover } : {}),
                "& fieldset": {
                  borderColor: isDark ? darkUi.inputBorderHover : "rgba(0,0,0,0.15)",
                },
              },
              "&.Mui-focused fieldset": {
                borderWidth: "1px",
                borderColor: isDark ? darkUi.inputFocusBorder : PRIMARY_MAIN,
              },
            },
            ...(isDark
              ? {
                  "&:focus-within .MuiOutlinedInput-root:not(.Mui-error)": {
                    boxShadow: darkUi.inputFocusShadow,
                  },
                }
              : {
                  "&:focus-within .MuiOutlinedInput-root:not(.Mui-error)": {
                    boxShadow: "0 0 0 1px rgba(33, 150, 243, 0.25)",
                  },
                }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 600,
            transition: "background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
            boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.06)",
            "&:hover": {
              boxShadow: isDark
                ? "0 0 24px -4px rgba(33, 150, 243, 0.45)"
                : "0 4px 12px rgba(33, 150, 243, 0.28)",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: isDark
                ? "0 0 28px -2px rgba(33, 150, 243, 0.55)"
                : "0 4px 14px rgba(33, 150, 243, 0.35)",
            },
          },
          containedPrimary: {
            color: paletteWhite,
            backgroundColor: PRIMARY_MAIN,
            "&:hover": {
              backgroundColor: PRIMARY_DARK,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            alignItems: "center",
            py: 1.5,
            px: 2,
          },
          icon: {
            alignItems: "center",
            opacity: 1,
            paddingTop: 0,
            paddingBottom: 0,
          },
          message: {
            padding: "4px 0",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: isDark
            ? {
                transition: "background-color 0.15s ease, color 0.15s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                },
              }
            : {},
        },
      },
    },
  });
}

/** @deprecated Usar `createAppTheme("light")`; se mantiene por compatibilidad con imports antiguos */
export function createLoginShellTheme() {
  return createAppTheme("light");
}

export function getLoginShellTheme() {
  return createAppTheme("light");
}
