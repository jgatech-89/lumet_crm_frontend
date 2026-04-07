import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, IconButton, Tooltip, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

import { useThemeMode } from "@/core/theme";

interface AuthLayoutProps {
  left: ReactNode;
  right: ReactNode;
  /** Contenido izquierdo del header (ej. logo), alineado con el toggle */
  headerStart?: ReactNode;
  sx?: SxProps<Theme>;
}

export function AuthLayout({ left, right, headerStart, sx }: AuthLayoutProps) {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
        ...sx,
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: headerStart != null ? "space-between" : "flex-end",
          alignItems: "center",
          flexShrink: 0,
          width: "100%",
          px: 4,
          py: 2,
          boxSizing: "border-box",
        }}
      >
        {headerStart != null ? headerStart : null}
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Tooltip title={mode === "light" ? "Modo oscuro" : "Modo claro"}>
            <IconButton
              type="button"
              onClick={toggleMode}
              aria-label={mode === "light" ? "Activar modo oscuro" : "Activar modo claro"}
              sx={{
                mr: 1,
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {left}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            minWidth: 0,
          }}
        >
          {right}
        </Box>
      </Box>
    </Box>
  );
}
