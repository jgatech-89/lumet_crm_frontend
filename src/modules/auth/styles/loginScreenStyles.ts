import type { SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { darkUi } from "@/core/theme/darkUi";

export const formAnimationSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: 460,
  mx: "auto",
  animation: "fadeIn 0.6s ease-out",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(8px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export const inputSx: SxProps<Theme> = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.palette.mode === "dark" ? "12px" : 2,
    bgcolor: theme.palette.mode === "dark" ? darkUi.inputBg : "background.paper",
    minHeight: 60,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.15s ease",
    ...(theme.palette.mode === "dark"
      ? {
          color: darkUi.inputText,
          "&:hover:not(.Mui-focused):not(.Mui-error)": {
            bgcolor: darkUi.inputBgHover,
          },
        }
      : {}),
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor:
        theme.palette.mode === "dark" ? darkUi.inputBorder : "rgba(0, 0, 0, 0.08)",
      ...(theme.palette.mode === "dark" ? { borderWidth: "1px" } : {}),
    },
    "&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
      borderColor:
        theme.palette.mode === "dark" ? darkUi.inputBorderHover : "rgba(0, 0, 0, 0.15)",
    },
    "&.Mui-focused:not(.Mui-error)": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor:
          theme.palette.mode === "dark" ? darkUi.inputFocusBorder : theme.palette.primary.main,
        borderWidth: "1px",
      },
      ...(theme.palette.mode === "light"
        ? {
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
          }
        : {}),
    },
  },
});

export const primaryButtonSx: SxProps<Theme> = (theme) => ({
  mt: 2.5,
  height: 60,
  borderRadius: 2,
  bgcolor: "primary.main",
  color: "primary.contrastText",
  fontWeight: 700,
  boxShadow: "none",
  transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover:not(.Mui-disabled)": {
    bgcolor: "primary.dark",
    transform: "translateY(-2px)",
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
});

export const linkButtonSx: SxProps<Theme> = (theme) => ({
  color: "text.secondary",
  textDecoration: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  p: 0,
  font: "inherit",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.light,
  },
});
