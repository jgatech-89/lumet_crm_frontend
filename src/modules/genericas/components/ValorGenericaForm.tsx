import { useRef } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { AttachFile, CloudUploadOutlined } from "@mui/icons-material";

export const VALOR_GENERICA_MODAL_FORM_ID = "form-valor-generica-modal";

const fieldLabelProps = {
  sx: { fontWeight: 600, color: "text.primary", fontSize: "0.8rem" },
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "background.paper",
  },
};

const rowStackProps = {
  direction: { xs: "column" as const, sm: "row" as const },
  spacing: { xs: 1, sm: 1.25 },
  sx: { alignItems: { sm: "flex-start" } },
};

export interface ValorGenericaModalFormProps {
  values: Record<string, string>;
  setField: (key: string, value: string) => void;
  archivo: File | null;
  setArchivo: (file: File | null) => void;
  nombreError: string;
  saving: boolean;
  pairs: [string, string, string][];
  onSubmit: () => void;
  existingArchivoLabel?: string | null;
}

export function ValorGenericaModalForm({
  values,
  setField,
  archivo,
  setArchivo,
  nombreError,
  saving,
  pairs,
  onSubmit,
  existingArchivoLabel,
}: ValorGenericaModalFormProps) {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const archivoHint =
    archivo?.name ??
    (existingArchivoLabel?.trim() ? `Archivo actual: ${existingArchivoLabel.trim()}` : null);

  return (
    <Box
      id={VALOR_GENERICA_MODAL_FORM_ID}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
      }}
      noValidate
    >
      <Stack spacing={1.15} sx={{ pt: { xs: 1, sm: 1.25 } }}>
        <TextField
          label="Nombre"
          required
          fullWidth
          size="small"
          value={values.nombre}
          onChange={(e) => setField("nombre", e.target.value)}
          error={!!nombreError}
          helperText={nombreError}
          disabled={saving}
          autoFocus
          InputLabelProps={fieldLabelProps}
          sx={fieldSx}
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.25}
          sx={{ alignItems: { md: "stretch" } }}
        >
          <TextField
            label="Código"
            fullWidth
            size="small"
            value={values.codigo}
            onChange={(e) => setField("codigo", e.target.value)}
            disabled={saving}
            placeholder="Opcional"
            InputLabelProps={fieldLabelProps}
            sx={{
              ...fieldSx,
              flex: { md: "1.3 1 0" },
              minWidth: { md: 0 },
            }}
          />
          <TextField
            label="Descripción"
            fullWidth
            size="small"
            value={values.descripcion}
            onChange={(e) => setField("descripcion", e.target.value)}
            disabled={saving}
            placeholder="Opcional"
            InputLabelProps={fieldLabelProps}
            sx={{
              ...fieldSx,
              flex: { md: "1.75 1 0" },
              minWidth: { md: 0 },
            }}
          />
          <TextField
            label="Icono"
            fullWidth
            size="small"
            value={values.icono}
            onChange={(e) => setField("icono", e.target.value)}
            disabled={saving}
            placeholder="Referencia al icono"
            InputLabelProps={fieldLabelProps}
            sx={{
              ...fieldSx,
              flex: { md: "1.15 1 0" },
              minWidth: { md: 0 },
            }}
          />
          <TextField
            label="Orden"
            fullWidth
            type="number"
            size="small"
            value={values.valor_orden}
            onChange={(e) => setField("valor_orden", e.target.value)}
            disabled={saving}
            placeholder="Nº"
            InputLabelProps={fieldLabelProps}
            sx={{
              ...fieldSx,
              flex: { md: "0 0 88px" },
              width: { md: 88 },
              maxWidth: { md: 88 },
              flexShrink: 0,
            }}
          />
        </Stack>

        <Stack spacing={1.15}>
          {pairs.map(([labelKey, valueKey, letter]) => (
            <Stack key={valueKey} {...rowStackProps}>
              <TextField
                label={`Etiqueta ${letter}`}
                fullWidth
                size="small"
                value={values[labelKey]}
                onChange={(e) => setField(labelKey, e.target.value)}
                disabled={saving}
                InputLabelProps={fieldLabelProps}
                sx={{ ...fieldSx, flex: 1, minWidth: 0 }}
              />
              <TextField
                label={`Valor ${letter}`}
                fullWidth
                size="small"
                value={values[valueKey]}
                onChange={(e) => setField(valueKey, e.target.value)}
                disabled={saving}
                InputLabelProps={fieldLabelProps}
                sx={{ ...fieldSx, flex: 1, minWidth: 0 }}
              />
            </Stack>
          ))}
        </Stack>

        <Box sx={{ pt: 0.5 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              mb: 0.75,
              fontSize: "0.8rem",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <AttachFile sx={{ fontSize: 18, color: "primary.main", opacity: 0.9 }} />
            Archivo adjunto
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            disabled={saving}
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
          <Box
            onClick={() => !saving && fileInputRef.current?.click()}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1.5,
              px: 2,
              py: { xs: 1.5, sm: 1.35 },
              borderRadius: 2,
              border: "1px dashed",
              borderColor: archivo ? alpha(theme.palette.primary.main, 0.55) : "divider",
              bgcolor: archivo
                ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.1 : 0.05)
                : alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.06 : 0.03),
              cursor: saving ? "default" : "pointer",
              transition: theme.transitions.create(
                ["border-color", "background-color", "box-shadow"],
                { duration: theme.transitions.duration.shorter },
              ),
              "&:hover": {
                borderColor: alpha(theme.palette.primary.main, 0.75),
                bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.06),
                boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "100%", sm: 52 },
                height: 52,
                flexShrink: 0,
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: "primary.main",
              }}
            >
              <CloudUploadOutlined sx={{ fontSize: 28 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary", mb: 0.25 }}>
                {archivo ? "Archivo seleccionado" : "Arrastra o elige un archivo"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: archivo || archivoHint ? "text.primary" : "text.secondary",
                  fontWeight: archivo || archivoHint ? 500 : 400,
                  fontStyle: archivo || archivoHint ? "normal" : "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={archivo?.name ?? existingArchivoLabel ?? undefined}
              >
                {archivoHint ??
                  "PDF, imágenes u otros formatos admitidos por el servidor"}
              </Typography>
            </Box>
            <Button
              type="button"
              variant="contained"
              size="small"
              disableElevation
              disabled={saving}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              sx={{
                flexShrink: 0,
                textTransform: "none",
                fontWeight: 700,
                px: 2,
                borderRadius: 1.5,
                boxShadow: "none",
              }}
            >
              Examinar
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
