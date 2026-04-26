import { createTheme } from "@mui/material/styles";

import { darkUi } from "./darkUi";
import {
  transition,
  PRESS_SCALE,
  HOVER_LIFT,
  FADE_IN_KEYFRAME,
} from "./motion";

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

const PRIMARY_MAIN = "#2196f3";
const PRIMARY_LIGHT = "#42a5f5";
const PRIMARY_DARK = "#1976d2";

const inputAutofillLight = "#ffffff";
const inputAutofillDark = darkUi.inputBg;

const autofillInputStyles = (isDark: boolean) => {
  const bg = isDark ? inputAutofillDark : inputAutofillLight;
  return {
  "& input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 1000px ${bg} inset`,
    WebkitTextFillColor: isDark ? darkUi.inputText : "#111827",
    transition: "background-color 9999s ease-in-out 0s",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: isDark
      ? `0 0 0 1000px ${darkUi.inputBgHover} inset`
      : "0 0 0 1000px #FFFFFF inset",
    WebkitTextFillColor: isDark ? darkUi.inputText : "#111827",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: `0 0 0 1000px ${bg} inset`,
    WebkitTextFillColor: isDark ? darkUi.inputText : "#111827",
  },
  "& input:-webkit-autofill:active": {
    WebkitBoxShadow: `0 0 0 1000px ${bg} inset`,
    WebkitTextFillColor: isDark ? darkUi.inputText : "#111827",
  },
};
};

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
        styleOverrides: `
          ${FADE_IN_KEYFRAME}
          body {
            font-feature-settings: "cv02", "cv03", "cv04", "cv11";
            ${isDark ? "  -webkit-font-smoothing: antialiased;\n            -moz-osx-font-smoothing: grayscale;\n            text-rendering: optimizeLegibility;" : ""}
          }
        `,
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
            transition: transition(["color"], "fast"),
            "&.Mui-focused": {
              color: isDark ? darkUi.inputFocusBorder : PRIMARY_MAIN,
            },
            ...(isDark
              ? {
                  color: darkUi.inputLabel,
                  "&.Mui-error": {
                    color: "#F87171",
                  },
                }
              : {}),
            "&.MuiInputLabel-outlined": {
              "&.MuiInputLabel-shrink": {
                zIndex: 1,
                padding: "0 4px",
                backgroundColor: isDark ? darkUi.inputBg : paletteWhite,
                ...(isDark
                  ? {
                      color: darkUi.inputText,
                    }
                  : {}),
              },
            },
            "&.Mui-disabled": isDark
              ? {
                  color: "rgba(161, 161, 170, 0.45)",
                }
              : {},
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: isDark
            ? {
                color: "rgba(161, 161, 170, 0.9)",
                marginTop: 6,
                "&.Mui-disabled": { opacity: 0.5 },
              }
            : { marginTop: 6 },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: isDark
            ? {
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                },
              }
            : {},
          input: isDark
            ? {
                "&::placeholder": {
                  color: darkUi.inputPlaceholder,
                  opacity: 1,
                },
              }
            : {},
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: isDark ? "12px" : 12,
            backgroundColor: isDark ? darkUi.inputBg : paletteWhite,
            color: isDark ? darkUi.inputText : undefined,
            transition: transition([
              "border-color",
              "box-shadow",
              "background-color",
            ]),
            ...(isDark
              ? {
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(34, 34, 38, 0.5)",
                    color: "rgba(244, 244, 245, 0.38)",
                    pointerEvents: "auto",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "none",
                    },
                  },
                }
              : {
                  "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  },
                }),
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
                borderWidth: 1,
                transition: transition(["border-color", "box-shadow"], "fast"),
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
                borderWidth: isDark ? 1 : undefined,
              },
              "&:hover": {
                ...(isDark ? { backgroundColor: darkUi.inputBgHover } : {}),
                "& fieldset": {
                  borderColor: isDark ? darkUi.inputBorderHover : "rgba(0,0,0,0.15)",
                },
              },
              "&.Mui-focused": isDark
                ? {
                    boxShadow: "none",
                  }
                : {},
              "&.Mui-focused fieldset": {
                borderWidth: 1,
                borderColor: isDark ? darkUi.inputFocusBorder : PRIMARY_MAIN,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 600,
            transition: transition(["background-color", "box-shadow", "transform", "filter"]),
            boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.06)",
            "&:hover": {
              boxShadow: isDark
                ? "0 0 24px -4px rgba(33, 150, 243, 0.45)"
                : "0 4px 12px rgba(33, 150, 243, 0.28)",
            },
            "&:active": {
              transform: PRESS_SCALE,
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
      MuiListItemButton: {
        styleOverrides: {
          root: {
            transition: transition(["background-color", "transform", "color"]),
            "&:active": {
              transform: PRESS_SCALE,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: transition(["background-color", "color", "transform"]),
            "&:hover": {
              transform: HOVER_LIFT,
              ...(isDark ? { backgroundColor: "rgba(255, 255, 255, 0.08)" } : {}),
            },
            "&:active": {
              transform: PRESS_SCALE,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            transition: transition(["background-color", "color"], "fast"),
            borderRadius: 8,
            margin: "2px 6px",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            transition: transition(["box-shadow", "transform"], "fast"),
          },
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
