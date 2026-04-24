import type { SxProps, Theme } from "@mui/material/styles";
import type { ListarDatosVariant } from "../types/listarDatos.types";

export const listarDatosStyles = {
  /** Contenedor de la fila: sin bordes; la separación es con `<Divider />` en el padre */
  listItem: {
    alignItems: "flex-start",
    transition: "background-color 0.15s ease",
  } satisfies SxProps<Theme>,

  listItemSelected: {
    backgroundColor: "rgba(244, 114, 182, 0.12)",
    "&:hover": {
      backgroundColor: "rgba(244, 114, 182, 0.16)",
    },
  } satisfies SxProps<Theme>,

  /** Padding del contenido de cada fila (ajustar con `dense` en el componente) */
  listItemContent: (dense: boolean) =>
    ({
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      width: "100%",
      px: 2,
      py: dense ? 1 : 1.5,
    }) satisfies SxProps<Theme>,

  primaryText: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "text.primary",
    lineHeight: 1.35,
    textTransform: "none",
  } satisfies SxProps<Theme>,

  secondaryStack: {
    marginTop: "4px",
    gap: "2px",
  } satisfies SxProps<Theme>,

  secondaryLine: {
    fontSize: "0.8rem",
    color: "text.secondary",
    lineHeight: 1.4,
  } satisfies SxProps<Theme>,

  actionsBox: {
    display: "flex",
    alignItems: "center",
    gap: 0.25,
    flexShrink: 0,
    marginLeft: 1,
  } satisfies SxProps<Theme>,

  emptyBox: {
    padding: 3,
    textAlign: "center" as const,
    color: "text.secondary",
    fontSize: "0.875rem",
  } satisfies SxProps<Theme>,

  skeletonItem: (dense: boolean) =>
    ({
      px: 2,
      py: dense ? 1 : 1.5,
    }) satisfies SxProps<Theme>,
} as const;

export const listarRootSx = (variant: ListarDatosVariant) =>
  ({
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 0,
    minWidth: 0,
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflow: "hidden" as const,
    ...(variant === "embedded"
      ? {
          px: 0,
          py: 0,
          backgroundColor: "transparent",
        }
      : {
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }),
  }) satisfies SxProps<Theme>;

export const listarToolbarSx = (variant: ListarDatosVariant) =>
  ({
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    minWidth: 0,
    width: "100%",
    gap: 2,
    py: 1.5,
    px: 2,
    ...(variant === "embedded"
      ? {
          backgroundColor: "transparent",
        }
      : {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "action.hover" : "grey.50",
        }),
  }) satisfies SxProps<Theme>;

export const listarSummaryText: SxProps<Theme> = {
  fontSize: "0.88rem",
  color: "text.secondary",
  flex: "1 1 auto",
  minWidth: 0,
};

export const listarListScroll: SxProps<Theme> = {
  overflow: "auto" as const,
  minHeight: 0,
  minWidth: 0,
  width: "100%",
};

export const listarDivider: SxProps<Theme> = {
  my: 0,
  borderColor: "divider",
};
