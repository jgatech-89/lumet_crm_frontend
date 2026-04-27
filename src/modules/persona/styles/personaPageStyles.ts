import type { RolPersona } from "@/modules/persona/types/persona.types";

export const personaRolBadgeStyles: Record<RolPersona, { bg: string; color: string }> = {
  Administrador: { bg: "#ECEFF1", color: "#455A64" },
  Usuario: { bg: "#F3E5F5", color: "#6A1B9A" },
  Supervisor: { bg: "#E3F2FD", color: "#1E88E5" },
  Comercial: { bg: "#E0F2F1", color: "#00897B" },
  Cerrador: { bg: "#FFF8E1", color: "#FBC02D" },
};

export const personaAvatarRoleStyles: Record<RolPersona, { bg: string; color: string }> = {
  Administrador: { bg: "#ECEFF1", color: "#455A64" },
  Usuario: { bg: "#F3E5F5", color: "#6A1B9A" },
  Supervisor: { bg: "#E3F2FD", color: "#1E88E5" },
  Comercial: { bg: "#E8F5E9", color: "#2E7D32" },
  Cerrador: { bg: "#FFF3E0", color: "#EF6C00" },
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
  border: "1px solid #E0E0E0",
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
  fontSize: "0.9rem",
  color: "text.primary",
  "& .MuiSelect-select": {
    py: 1,
    px: 2,
    display: "flex",
    alignItems: "center",
  },
  "&:hover": {
    borderColor: "#1E88E5",
    backgroundColor: "#FAFAFA",
  },
  "& .MuiSelect-icon": {
    color: "#718096",
    right: 8,
  },
} as const;
