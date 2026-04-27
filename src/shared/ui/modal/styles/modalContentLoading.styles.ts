import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

/** `DialogContent` cuando el contenido usa carga lineal (centra y evita márgenes entre hijos). */
export const modalDialogContentLinearLoadingSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  py: 0,
  "& > * + *": { mt: 0 },
};

/** Contenedor centrado del `LinearLoader` bajo el título (carga de contenido). */
export const modalLinearLoaderContentBodySx: SxProps<Theme> = {
  flex: 1,
  minHeight: { xs: 200, sm: 240 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box",
  m: { xs: 1.5, sm: 2 },
  p: { xs: 1.25, sm: 1.75 },
};

/** Contenedor del loader en `actionLoadingMode="top"`. */
export const modalLinearLoaderActionTopWrapSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  m: { xs: 1.5, sm: 2 },
  py: { xs: 1, sm: 1.25 },
};

/** Capa overlay de `actionLoading` (fondo semitransparente). */
export const modalLinearLoaderOverlayOuterSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  zIndex: 7,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: { xs: 2, sm: 2.5 },
  bgcolor: (theme) =>
    alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.72 : 0.78),
  backdropFilter: "blur(2px)",
};

/** Caja interior del overlay (limita ancho y centra). */
export const modalLinearLoaderOverlayInnerSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: 460,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  m: { xs: 0.5, sm: 1 },
};
