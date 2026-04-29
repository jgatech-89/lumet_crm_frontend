import { PersonaModal } from "@/modules/persona/components/PersonaModal";
import type { PersonaFormValues, PersonaPayload } from "@/modules/persona/types/persona.types";

interface PersonaFormProps {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: PersonaPayload) => Promise<void> | void;
  personaData?: PersonaFormValues | null;
}

export function PersonaForm({ open, onClose, onSave, personaData }: PersonaFormProps) {
  return (
    <PersonaModal
      open={open}
      onClose={onClose}
      onSave={onSave}
      personaData={personaData}
    />
  );
}
