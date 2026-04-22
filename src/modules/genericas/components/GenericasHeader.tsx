import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";

interface GenericasHeaderProps {
  onNuevaGenerica: () => void;
}

export function GenericasHeader({ onNuevaGenerica }: GenericasHeaderProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Box>
        <Typography variant="h4">Gestión de Genéricas</Typography>
        <Typography variant="subtitle1" sx={{  color: "text.secondary" }}>
          Administra estados, módulos, permisos y relaciones del sistema
        </Typography>
      </Box>
      <CustomButton label="Nueva Genérica" onClick={onNuevaGenerica} startIcon={<Add />} />
    </Box>
  );
}
