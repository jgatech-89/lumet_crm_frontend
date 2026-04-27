import type { SxProps, Theme } from "@mui/material/styles";
import { linearLoaderProgressSx } from "./loading.styles";

/** Stack interior del loader (no fullPage). */
export const linearLoaderStackSx: SxProps<Theme> = {
  width: "100%",
  alignItems: "center",
};

/** Stack interior del loader en modo fullPage. */
export const linearLoaderFullPageStackSx: SxProps<Theme> = {
  width: "min(460px, 100%)",
  alignItems: "center",
};

export const linearLoaderLabelSx: SxProps<Theme> = {
  fontWeight: 500,
  textAlign: "center",
};

/** Barra de progreso a ancho completo del contenedor. */
export const linearLoaderProgressFullRowSx: SxProps<Theme> = [
  linearLoaderProgressSx,
  { width: "100%", alignSelf: "stretch" },
];

/** Ancho máximo habitual del bloque dentro de modales. */
export const linearLoaderInModalNarrowSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: 440,
  alignSelf: "center",
};
