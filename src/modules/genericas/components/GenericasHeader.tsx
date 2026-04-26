import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Add } from "@mui/icons-material";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";

interface GenericasHeaderProps {
  onNuevaGenerica: () => void;
}

export function GenericasHeader({ onNuevaGenerica }: GenericasHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestión de Genéricas
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Administra estados, módulos, permisos y relaciones del sistema
        </Typography>
      </Box>
      <CustomButton
        label="Nueva Genérica"
        onClick={onNuevaGenerica}
        startIcon={<Add fontSize="small" />}
        sx={{
          px: 2.2,
          py: 1.1,
          borderRadius: "12px",
          boxShadow: `0 8px 18px ${alpha("#2563eb", 0.22)}`,
          "&:hover": {
            boxShadow: `0 10px 22px ${alpha("#2563eb", 0.28)}`,
            transform: "translateY(-1px)",
          },
        }}
      />
    </Box>
  );
}
