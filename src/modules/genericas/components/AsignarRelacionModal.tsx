import { useMemo, type KeyboardEvent, type ReactNode } from "react";
import {
  Box,
  ButtonBase,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  CheckCircleOutline,
  CloseOutlined,
  ExpandMore,
  ListAlt,
} from "@mui/icons-material";
import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CancelarBoton } from "@/shared/ui/buttons/components/BotonesAccionCrud";
import { ListarDatos } from "@/shared/ui/listar-datos";
import type { Generica, ValorGenericaConPermiso } from "../types/genericas.types";
import type { Action } from "@/shared/ui/table/components/TableRow";

const PICKER_MODAL_SUBTITLE =
  "Busca o elige en la lista la genérica que servirá de criterio para el vínculo.";

type AsignarRelacionModalProps = {
  open: boolean;
  onClose: () => void;
  parametroDisplay: string;
  onOpenGenericaPicker: () => void;
  genericaPickerOpen: boolean;
  onCloseGenericaPicker: () => void;
  genericas: Generica[];
  loadingGenericas: boolean;
  onSelectGenerica: (g: Generica) => void | Promise<void>;
  loadingValoresConPermiso: boolean;
  valoresConPermiso: ValorGenericaConPermiso[];
  onActionPermisoSecundario: (row: ValorGenericaConPermiso) => void;
};

function PickerFieldCard(props: {
  value: string;
  placeholder: string;
  onOpen: () => void;
}): ReactNode {
  const { value, placeholder, onOpen } = props;
  const theme = useTheme();
  const hasValue = value.trim() !== "";
  const primary = theme.palette.primary.main;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <ButtonBase
      component="div"
      onClick={onOpen}
      onKeyDown={onKey}
      tabIndex={0}
      focusRipple
      aria-label="Abrir listado de genéricas"
      role="button"
      sx={{
        display: "block",
        width: 1,
        textAlign: "left",
        borderRadius: 2.5,
        p: 0.25,
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&.Mui-focusVisible": {
          boxShadow: `0 0 0 3px ${alpha(primary, 0.35)}`,
        },
        "&:hover .AsignarRelacion-pickerInner": {
          borderColor: alpha(primary, 0.6),
          boxShadow: "0 10px 28px -6px rgba(15, 23, 42, 0.12), 0 0 0 1px " + alpha(primary, 0.2),
        },
        "&:active .AsignarRelacion-pickerInner": {
          transform: "scale(0.995)",
        },
      }}
    >
      <Box
        className="AsignarRelacion-pickerInner"
        sx={(t) => ({
          position: "relative",
          borderRadius: 2,
          border: "2px solid",
          borderColor: hasValue ? alpha(primary, 0.4) : t.palette.divider,
          background:
            t.palette.mode === "dark"
              ? alpha(t.palette.common.white, 0.04)
              : (() => {
                  const a = t.palette.action.hover;
                  return `linear-gradient(145deg, ${alpha(primary, 0.06)} 0%, ${a} 46%, #fff 100%)`;
                })(),
          pl: 1.75,
          pr: 1.5,
          py: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          boxShadow: "0 2px 6px -1px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.55)",
          transition: t.transitions.create(["border-color", "box-shadow", "transform"], {
            duration: t.transitions.duration.shorter,
          }),
        })}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 32,
            height: 32,
            borderRadius: 1.5,
            flexShrink: 0,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
            color: "primary.main",
          }}
        >
          <ListAlt sx={{ fontSize: 18 }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1, py: 0.25 }}>
          <Typography
            variant="caption"
            sx={(t) => ({
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 700,
              fontSize: "0.6rem",
              color: t.palette.text.secondary,
              lineHeight: 1.1,
            })}
          >
            Parámetro
          </Typography>
          <Typography
            component="p"
            sx={(t) => ({
              mt: 0.25,
              fontWeight: hasValue ? 600 : 500,
              fontSize: "0.9rem",
              lineHeight: 1.3,
              color: hasValue ? t.palette.text.primary : t.palette.text.disabled,
              fontStyle: hasValue ? "normal" : "italic",
            })}
          >
            {hasValue ? value : placeholder}
          </Typography>
        </Box>
        <Box
          sx={(t) => ({
            color: t.palette.primary.main,
            display: "flex",
            flexShrink: 0,
            alignSelf: "center",
            opacity: 0.9,
            transition: t.transitions.create("opacity", {
              duration: t.transitions.duration.shorter,
            }),
            ".MuiButtonBase-root:hover &": { opacity: 1 },
          })}
        >
          <ExpandMore sx={{ fontSize: 24 }} />
        </Box>
      </Box>
    </ButtonBase>
  );
}

export function AsignarRelacionModal({
  open,
  onClose,
  parametroDisplay,
  onOpenGenericaPicker,
  genericaPickerOpen,
  onCloseGenericaPicker,
  genericas,
  loadingGenericas,
  onSelectGenerica,
  loadingValoresConPermiso,
  valoresConPermiso,
  onActionPermisoSecundario,
}: AsignarRelacionModalProps) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const accionesValoresConPermiso = useMemo<Action<ValorGenericaConPermiso>[]>(
    () => [
      {
        label: "Asignar permiso",
        icon: <CheckCircleOutline fontSize="medium" />,
        onClick: (row) => onActionPermisoSecundario(row),
        iconForRow: (row) =>
          row.permiso > 0 ? (
            <CloseOutlined fontSize="medium" />
          ) : (
            <CheckCircleOutline fontSize="medium" />
          ),
        colorHex: "#16a34a",
        colorHexForRow: (row) => (row.permiso > 0 ? "#ef4444" : "#16a34a"),
        getLabel: (row) => (row.permiso > 0 ? "Quitar permiso" : "Asignar permiso"),
      },
    ],
    [onActionPermisoSecundario],
  );

  const pickerActions = useMemo<Action<Generica>[]>(
    () => [
      {
        label: "Seleccionar",
        icon: <CheckCircleOutline fontSize="medium" />,
        colorHex: "#16a34a",
        onClick: (row) => {
          void onSelectGenerica(row);
        },
      },
    ],
    [onSelectGenerica],
  );

  const mainPaperSx = {
    position: "relative" as const,
    backgroundImage: `linear-gradient(180deg, ${alpha(primary, 0.05)} 0%, transparent 42%, transparent 100%)`,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgba(255,255,255,0.08), 0 20px 48px -12px rgba(0,0,0,0.55)"
        : "0 0 0 1px rgba(15, 23, 42, 0.06), 0 20px 44px -8px rgba(15, 23, 42, 0.14), 0 2px 10px rgba(15, 23, 42, 0.04)",
  };

  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        title='¡ ASIGNAR RELACIÓN !'
        maxWidth="md"
        fullWidth
        bottomBorderColor={primary}
        disableBackdropClose={false}
        contentLoading={false}
        contentSx={{
          pt: 4.5,
          px: 2.5,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          minHeight: 0,
        }}
        actions={<CancelarBoton onClick={onClose} />}
        actionsSx={{ bgcolor: "transparent", px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
      >
        <Stack spacing={2.5} sx={{ width: 1, alignItems: "stretch", pt: 1.5 }}>
          <PickerFieldCard
            value={parametroDisplay}
            placeholder="Seleccionar genérica"
            onOpen={onOpenGenericaPicker}
          />
          {loadingValoresConPermiso ? (
            <Box
              sx={{
                width: 1,
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: (t) => `inset 0 0 0 1px ${t.palette.divider}`,
              }}
            >
              <LinearProgress
                sx={(t) => ({
                  height: 5,
                  borderRadius: 0,
                  bgcolor: alpha(t.palette.primary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 0,
                    background: `linear-gradient(90deg, ${t.palette.primary.light}, ${t.palette.primary.main})`,
                  },
                })}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", p: 1, textAlign: "center" }}>
                Cargando valores y permisos…
              </Typography>
            </Box>
          ) : null}
          {parametroDisplay.trim() !== "" && !loadingValoresConPermiso ? (
            <ListarDatos<ValorGenericaConPermiso>
              data={valoresConPermiso}
              variant="embedded"
              listMaxHeight={360}
              sx={{ my: 0, width: 1 }}
              summaryTitle="Valores y permisos"
              primary={{ key: ["id", "nombre"] }}
              actions={accionesValoresConPermiso}
              enableSearch
              searchPlaceholder="Buscar en esta lista"
              searchKeys={["id", "nombre", "codigo"]}
            />
          ) : null}
        </Stack>
      </CustomModal>

      <CustomModal
        open={genericaPickerOpen}
        onClose={onCloseGenericaPicker}
        title={
          <Typography
            component="h2"
            fontWeight={800}
            color="text.primary"
            variant="h5"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" }, letterSpacing: "-0.02em" }}
          >
            Seleccionar parámetro
          </Typography>
        }
        subtitle={
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4, lineHeight: 1.5 }}>
            {PICKER_MODAL_SUBTITLE}
          </Typography>
        }
        maxWidth="md"
        fullWidth
        bottomBorderColor={primary}
        disableBackdropClose={false}
        contentLoading={false}
        contentSx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
          pt: 2.25,
          px: 2.5,
          pb: 2.25,
        }}
        actions={<CancelarBoton onClick={onCloseGenericaPicker} />}
        actionsSx={{ bgcolor: "transparent", px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
        slotProps={{ paper: { sx: mainPaperSx } }}
      >
        <ListarDatos<Generica>
          data={genericas}
          fillParentHeight
          variant="embedded"
          loading={loadingGenericas}
          sx={{ flex: 1, minHeight: 0, my: 0 }}
          summaryTitle="Listado de genéricas"
          primary={{ key: ["id", "nombre"] }}
          actions={pickerActions}
          enableSearch
          searchPlaceholder="Buscar genérica"
          searchKeys={["id", "nombre", "descripcion"]}
        />
      </CustomModal>
    </>
  );
}
