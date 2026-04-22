import { useEffect, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { createGenericaRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";

const FORM_ID = "form-nueva-generica";

interface NuevaGenericaModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function NuevaGenericaModal({ open, onClose, onCreated }: NuevaGenericaModalProps) {
  const { showSuccess, showError } = useSnackbar();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setNombre("");
    setDescripcion("");
    setNombreError("");
  }, [open]);

  const handleClose = () => {
    if (saving) return;
    onClose();
  };

  const handleSubmit = async () => {
    const trimmed = nombre.trim();
    if (!trimmed) {
      setNombreError("El nombre es obligatorio");
      return;
    }
    setNombreError("");
    setSaving(true);
    try {
      await createGenericaRequest({
        nombre: trimmed,
        descripcion: descripcion.trim(),
      });
      showSuccess("Genérica creada correctamente");
      onCreated();
      onClose();
    } catch (err) {
      showError(getRequestErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title="Nueva genérica"
      subtitle="Completa los datos para registrar una nueva genérica en el sistema."
      maxWidth="sm"
      disableBackdropClose={saving}
      actionLoading={saving}
      actionLoadingLabel="Guardando..."
      actions={
        <>
          <CustomButton label="Cancelar" variant="outlined" onClick={handleClose} disabled={saving} />
          <CustomButton
            label="Guardar"
            variant="contained"
            type="submit"
            form={FORM_ID}
            loading={saving}
          />
        </>
      }
      actionsSx={{
        px: 2,
        pb: 2,
        pt: 0,
        gap: 1.5,
        justifyContent: "flex-end",
      }}
    >
      <Box
        id={FORM_ID}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        noValidate
      >
        <Stack spacing={2} sx={{ pt: 0.5 }}>
          <TextField
            label="Nombre"
            required
            fullWidth
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (nombreError) setNombreError("");
            }}
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
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={saving}
            placeholder="Opcional"
          />
        </Stack>
      </Box>
    </CustomModal>
  );
}
