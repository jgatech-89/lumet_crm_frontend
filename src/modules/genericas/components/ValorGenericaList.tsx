import { Box, Typography } from "@mui/material";
import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { buildValorGenericaDetailRows } from "../utils/configValorGenericaDetail";
import type { ValorGenericaDetail } from "../types/genericas.types";

export interface ValorGenericaDetailModalProps {
  open: boolean;
  onClose: () => void;
  detail: ValorGenericaDetail | null;
  loading: boolean;
  error: string | null;
}

export function ValorGenericaDetailModal({
  open,
  onClose,
  detail,
  loading,
  error,
}: ValorGenericaDetailModalProps) {
  const rows = detail ? buildValorGenericaDetailRows(detail) : [];

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title=" ¡ DETALLE !"
      subtitle="Información de valores genéricas."
      maxWidth="sm"
      fullWidth
      disableBackdropClose={false}
      contentLoading={loading}
      contentLoadingVariant="linear"
      contentLoadingLabel="Cargando detalle..."
      actions={
        <CustomButton
          label="Cancelar"
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "divider",
            color: "text.secondary",
            fontWeight: 500,
            "&:hover": {
              borderColor: "primary.light",
              backgroundColor: "action.hover",
              color: "text.primary",
            },
          }}
        />
      }
    >
      {error ? (
        <Typography variant="body2" color="error" sx={{ px: 2.5, py: 2 }}>
          {error}
        </Typography>
      ) : detail ? (
        <Box sx={{ px: 0 }}>
          {rows.map((row, index) => (
            <Box
              key={`${row.label}-${index}`}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 0.5, sm: 2 },
                alignItems: "center",
                py: 1.35,
                px: 2.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                component="span"
                sx={{
                  minWidth: { xs: "100%", sm: 160 },
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {row.label}
              </Typography>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {typeof row.value === "string" || typeof row.value === "number" ? (
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {row.value}
                  </Typography>
                ) : (
                  row.value
                )}
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
    </CustomModal>
  );
}
