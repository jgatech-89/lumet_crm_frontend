import { PersonaModal } from "@/modules/persona/components/PersonaModal";
import type { PersonaFormValues, PersonaPayload, PersonaRolOption, PersonaTipoIdentificacionOption } from "@/modules/persona/types/persona.types";

interface PersonaFormProps {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: PersonaPayload) => Promise<void> | void;
  personaData?: PersonaFormValues | null;
  rolOpciones: PersonaRolOption[];
  rolesCatalogLoading?: boolean;
  tipoIdentificacionOpciones: PersonaTipoIdentificacionOption[];
  tipoIdentificacionCatalogLoading?: boolean;
}

export function PersonaForm({
  open,
  onClose,
  onSave,
  personaData,
  rolOpciones,
  rolesCatalogLoading,
  tipoIdentificacionOpciones,
  tipoIdentificacionCatalogLoading,
}: PersonaFormProps) {
  return (
    <PersonaModal
      open={open}
      onClose={onClose}
      onSave={onSave}
      personaData={personaData}
      rolOpciones={rolOpciones}
      rolesCatalogLoading={rolesCatalogLoading}
      tipoIdentificacionOpciones={tipoIdentificacionOpciones}
      tipoIdentificacionCatalogLoading={tipoIdentificacionCatalogLoading}
    />
  );
}
