import type { SxProps, Theme } from "@mui/material/styles";

/** Altura mínima estable del cuerpo del modal lista de valores (carga + listado). */
export const GENERICA_LIST_MODAL_BODY_MIN_HEIGHT = { xs: 380, sm: 460 } as const;

export const genericaModalListContentSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  minHeight: GENERICA_LIST_MODAL_BODY_MIN_HEIGHT,
  overflow: "hidden",
  px: 0,
  pt: 0.75,
  pb: 1,
};

/** Área centrada mientras cargan valores (misma intención que `modalLinearLoaderContentBodySx`). */
export const genericaModalListLoadingBodySx: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box",
  m: { xs: 1.5, sm: 2 },
  p: { xs: 1.25, sm: 1.75 },
};
