import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import type { RolPersona } from "@/modules/persona/types/persona.types";

type RoleTone = "primary" | "secondary" | "info" | "success" | "warning";

const personaRoleToneMap: Record<RolPersona, RoleTone> = {
  Administrador: "secondary",
  Usuario: "secondary",
  Supervisor: "info",
  Comercial: "success",
  Cerrador: "warning",
};

export const getPersonaRoleTone = (role: RolPersona): RoleTone =>
  personaRoleToneMap[role] ?? "primary";

export const getPersonaRoleChipSx = (role: RolPersona): SxProps<Theme> => (theme) => {
  const tone = getPersonaRoleTone(role);
  return {
    display: "inline-flex",
    alignItems: "center",
    bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.24 : 0.14),
    color: `${tone}.main`,
    fontWeight: 700,
    fontSize: "0.64rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    px: 0.85,
    py: 0.25,
    borderRadius: 999,
    lineHeight: 1.15,
    whiteSpace: "nowrap",
  };
};

export const personaPageContainerSx = {
  py: { xs: 2, md: 3 },
  px: { xs: 0.5, md: 1 },
} as const;

export const personaFilterLabelSx = {
  fontWeight: 700,
  fontSize: "0.85rem",
  color: "text.secondary",
  letterSpacing: "0.05em",
} as const;

export const personaFilterSelectSx = {
  width: "100%",
  minWidth: { xs: "100%", sm: 180 },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  backgroundColor: "background.paper",
  fontSize: "0.9rem",
  color: "text.primary",
  "& .MuiSelect-select": {
    py: 1,
    px: 2,
    display: "flex",
    alignItems: "center",
  },
  "&:hover": {
    borderColor: "primary.main",
    backgroundColor: "action.hover",
  },
  "& .MuiSelect-icon": {
    color: "text.secondary",
    right: 8,
  },
  boxShadow: (theme: { palette: { mode: string; primary: { main: string } } }) =>
    theme.palette.mode === "dark"
      ? `0 6px 14px ${alpha(theme.palette.primary.main, 0.2)}`
      : "none",
} as const;
