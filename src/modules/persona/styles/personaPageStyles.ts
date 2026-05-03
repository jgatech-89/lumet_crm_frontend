import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const HEX_6 = /^#[0-9A-Fa-f]{6}$/;
const HEX_3 = /^#[0-9A-Fa-f]{3}$/;

/** Normaliza `#RGB` / `#RRGGBB` / sin `#`; devuelve `#RRGGBB` o null si es inválido. */
export function normalizePersonaRoleHex(input: string | null | undefined): string | null {
  if (input == null || typeof input !== "string") return null;
  let s = input.trim();
  if (s.length === 0) return null;
  if (!s.startsWith("#")) s = `#${s}`;
  if (HEX_6.test(s)) return s.toUpperCase();
  if (HEX_3.test(s)) {
    const body = s.slice(1);
    return `#${body.split("").map((c) => `${c}${c}`).join("")}`.toUpperCase();
  }
  return null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const n = normalizePersonaRoleHex(hex);
  if (!n) return null;
  const h = n.slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const rs = lin(r);
  const gs = lin(g);
  const bs = lin(b);
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Color de texto legible sobre fondo `hex`. */
export function contrastTextOnHex(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#212121";
  const L = relativeLuminance(rgb.r, rgb.g, rgb.b);
  return L > 0.45 ? "#212121" : "#FFFFFF";
}

export const getPersonaRoleChipSxFromValora = (valora?: string | null): SxProps<Theme> => (theme) => {
  const hex = normalizePersonaRoleHex(valora ?? undefined);
  const fallbackBg = theme.palette.grey[300];
  const bg = hex ?? fallbackBg;
  const fg = hex ? contrastTextOnHex(hex) : theme.palette.getContrastText(fallbackBg);
  return {
    display: "inline-flex",
    alignItems: "center",
    bgcolor: bg,
    color: fg,
    fontWeight: 700,
    fontSize: "0.64rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    px: 0.85,
    py: 0.25,
    borderRadius: 999,
    lineHeight: 1.15,
    whiteSpace: "nowrap",
    border: hex ? `1px solid ${theme.palette.divider}` : "none",
  };
};

export const getPersonaAvatarSxFromValora = (valora?: string | null): SxProps<Theme> => (theme) => {
  const hex = normalizePersonaRoleHex(valora ?? undefined);
  const fallbackBg = theme.palette.grey[300];
  const bg = hex ?? fallbackBg;
  const fg = hex ? contrastTextOnHex(hex) : theme.palette.getContrastText(fallbackBg);
  return {
    bgcolor: bg,
    color: fg,
    fontWeight: 600,
    fontSize: "1rem",
    width: 44,
    height: 44,
  };
};

/** Avatar modal (tamaños mayores en el JSX si hace falta). */
export const getPersonaAvatarHeaderSxFromValora = (valora?: string | null): SxProps<Theme> => (theme) => {
  const hex = normalizePersonaRoleHex(valora ?? undefined);
  const fallbackBg = theme.palette.grey[300];
  const bg = hex ?? fallbackBg;
  const fg = hex ? contrastTextOnHex(hex) : theme.palette.getContrastText(fallbackBg);
  return {
    bgcolor: bg,
    color: fg,
    fontWeight: 600,
    fontSize: "0.82rem",
    width: 34,
    height: 34,
  };
};

/** Mismo criterio que Genéricas: ancho completo del `main`; el padding lo aplica ya `Layout`. */
export const personaPageContainerSx = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
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
