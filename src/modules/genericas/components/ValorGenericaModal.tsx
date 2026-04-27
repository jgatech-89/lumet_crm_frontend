import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { useValorGenericaForm } from "../hooks/useValorGenericaForm";
import { ValorGenericaModalForm, VALOR_GENERICA_MODAL_FORM_ID } from "./ValorGenericaForm";
import type { ValorGenericaDetail } from "../types/genericas.types";

interface ValorGenericaModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: ValorGenericaDetail | null;
  editDetailLoading?: boolean;
  genericaId: number;
  genericaName: string;
  onCreated: () => void;
}

export function ValorGenericaModal({
  open,
  onClose,
  mode,
  initialData,
  editDetailLoading = false,
  genericaId,
  genericaName,
  onCreated,
}: ValorGenericaModalProps) {
  const {
    values,
    setField,
    archivo,
    setArchivo,
    nombreError,
    saving,
    handleClose,
    handleSubmit,
    pairs,
  } = useValorGenericaForm({
    open,
    genericaId,
    onClose,
    onCreated,
    mode,
    initialData,
  });

  const existingArchivoLabel =
    mode === "edit" && initialData?.archivo?.trim() ? initialData.archivo.trim() : null;

  const contentLoading = mode === "edit" && editDetailLoading;
  const formLocked = contentLoading;

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={mode === "create" ? "¡ NUEVO VALOR GENÉRICA !" : "¡ EDITAR VALOR GENÉRICA !"}
      subtitle={
        genericaName.trim()
          ? `Genérica: ${genericaName.trim()}. ${
              mode === "create"
                ? "Completa los campos que necesites."
                : "Completa los campos que necesites para actualizar el valor."
            }`
          : mode === "create"
            ? "Completa los campos que necesites."
            : "Completa los campos que necesites para actualizar el valor."
      }
      maxWidth="md"
      fullWidth
      disableBackdropClose={saving}
      actionLoading={saving}
      actionLoadingLabel={mode === "create" ? "Guardando..." : "Actualizando..."}
      contentLoading={contentLoading}
      contentLoadingVariant="linear"
      contentLoadingLabel="Cargando valor..."
      contentSx={{
        px: { xs: 0.5, sm: 1 },
        pt: { xs: 1.25, sm: 1.75 },
        pb: 0.5,
      }}
      actions={
        <>
          <CustomButton
            label="Cancelar"
            variant="outlined"
            onClick={handleClose}
            disabled={saving}
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
          <CustomButton
            label={mode === "create" ? "Guardar" : "Actualizar"}
            variant="contained"
            type="submit"
            form={VALOR_GENERICA_MODAL_FORM_ID}
            loading={saving}
            disabled={formLocked}
            sx={{
              fontWeight: 600,
              boxShadow: "0 8px 18px rgba(37,99,235,0.24)",
            }}
          />
        </>
      }
    >
      <ValorGenericaModalForm
        values={values}
        setField={setField}
        archivo={archivo}
        setArchivo={setArchivo}
        nombreError={nombreError}
        saving={saving}
        pairs={pairs}
        onSubmit={handleSubmit}
        existingArchivoLabel={existingArchivoLabel}
      />
    </CustomModal>
  );
}
