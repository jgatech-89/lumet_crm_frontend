import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CancelarBoton, GuardarBoton } from "@/shared/ui/buttons/components/BotonesAccionCrud";
import { useGenericaForm } from "../hooks/useGenericaForm";
import { GenericaModalForm, NUEVA_GENERICA_MODAL_FORM_ID } from "./GenericaForm";
import type { Generica } from "../types/genericas.types";

interface GenericaModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Generica;
  onCreated: () => void;
}

export function GenericaModal({ open, onClose, onCreated, mode, initialData }: GenericaModalProps) {
  const {
    nombre,
    descripcion,
    nombreError,
    saving,
    handleClose,
    handleNombreChange,
    setDescripcion,
    handleSubmit,
  } = useGenericaForm({ open, onClose, onCreated, mode, initialData });

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={mode === "create" ? "Nueva genérica" : "Editar genérica"}
      subtitle={mode === "create" ? "Completa los datos para registrar una nueva genérica en el sistema." : "Completa los datos para editar la genérica."}
      maxWidth="sm"
      disableBackdropClose={saving}
      actionLoading={saving}
      actionLoadingLabel={mode === "create" ? "Guardando..." : "Actualizando..."}
      actionsSx={{ bgcolor: "transparent", px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
      actions={
        <>
          <CancelarBoton onClick={handleClose} disabled={saving} />
          <GuardarBoton
            label={mode === "create" ? "Guardar" : "Actualizar"}
            type="submit"
            form={NUEVA_GENERICA_MODAL_FORM_ID}
            loading={saving}
          />
        </>
      }
    >
      <GenericaModalForm
        nombre={nombre}
        descripcion={descripcion}
        nombreError={nombreError}
        saving={saving}
        onNombreChange={handleNombreChange}
        onDescripcionChange={setDescripcion}
        onSubmit={handleSubmit}
      />
    </CustomModal>
  );
}
