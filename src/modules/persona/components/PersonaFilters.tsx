import { FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

import { personaFilterLabelSx, personaFilterSelectSx } from "@/modules/persona/styles/personaPageStyles";

interface PersonaFiltersProps {
  filterRol: string;
  filterEstado: string;
  onChangeFilterRol: (value: string) => void;
  onChangeFilterEstado: (value: string) => void;
}

export function PersonaFilters({
  filterRol,
  filterEstado,
  onChangeFilterRol,
  onChangeFilterEstado,
}: PersonaFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1.5, md: 4 }}
      alignItems={{ xs: "stretch", md: "center" }}
      mb={{ xs: 2, sm: 2.5 }}
      sx={{ pl: { xs: 0, md: 1 } }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <Typography sx={{ ...personaFilterLabelSx, minWidth: { sm: "auto", md: 36 } }}>ROL:</Typography>
        <FormControl variant="standard" sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Select
            value={filterRol}
            onChange={(e) => onChangeFilterRol(e.target.value)}
            disableUnderline
            IconComponent={KeyboardArrowDown}
            sx={personaFilterSelectSx}
          >
            <MenuItem value="todos">Todos los roles</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
            <MenuItem value="usuario">Usuario</MenuItem>
            <MenuItem value="supervisor">Supervisor</MenuItem>
            <MenuItem value="comercial">Comercial</MenuItem>
            <MenuItem value="cerrador">Cerrador</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <Typography sx={{ ...personaFilterLabelSx, minWidth: { sm: "auto", md: 58 } }}>ESTADO:</Typography>
        <FormControl variant="standard" sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Select
            value={filterEstado}
            onChange={(e) => onChangeFilterEstado(e.target.value)}
            disableUnderline
            IconComponent={KeyboardArrowDown}
            sx={personaFilterSelectSx}
          >
            <MenuItem value="todos">Todos los estados</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
