import { Box, Stack, TextField } from "@mui/material";

export const NUEVA_GENERICA_MODAL_FORM_ID = "form-nueva-generica";

interface GenericaModalFormProps {
  nombre: string;
  descripcion: string;
  nombreError: string;
  saving: boolean;
  onNombreChange: (value: string) => void;
  onDescripcionChange: (value: string) => void;
  onSubmit: () => void;
}

export function GenericaModalForm({
  nombre,
  descripcion,
  nombreError,
  saving,
  onNombreChange,
  onDescripcionChange,
  onSubmit,
}: GenericaModalFormProps) {
  return (
    <Box
      id={NUEVA_GENERICA_MODAL_FORM_ID}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
      }}
      noValidate
    >
      <Stack
        spacing={{ xs: 2, sm: 4 }}
        sx={{
          pt: { xs: 1.5, sm: 4.5 },
          px: { xs: 0.5, sm: 1 },
        }}
        mb={2}
      >
        <TextField
          label="Nombre"
          required
          fullWidth
          value={nombre}
          onChange={(e) => onNombreChange(e.target.value)}
          error={!!nombreError}
          helperText={nombreError}
          autoFocus
          disabled={saving}
        />
        <TextField
          label="Descripción"
          fullWidth
          multiline
          minRows={3}
          value={descripcion}
          onChange={(e) => onDescripcionChange(e.target.value)}
          disabled={saving}
          placeholder="Opcional"
        />
      </Stack>
    </Box>
  );
}
