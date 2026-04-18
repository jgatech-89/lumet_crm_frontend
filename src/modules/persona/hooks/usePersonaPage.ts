import { useCallback, useEffect, useMemo, useState } from "react";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import { createPersonaRequest, deletePersonaRequest, fetchPersonasRequest } from "../api/personaApi";
import { PERSONA_ROWS_PER_PAGE } from "../constants/personaSeedData";
import type { PersonaFormValues, PersonaPayload, PersonaSummary } from "../types/persona.types";
import { parsePersonaSummaryToFormValues } from "../utils/personaMappers";

export function usePersonaPage() {
  const { showSuccess, showError } = useSnackbar();
  const [personas, setPersonas] = useState<PersonaSummary[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<PersonaFormValues | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaSummary | null>(null);
  const [personaToDelete, setPersonaToDelete] = useState<PersonaSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterRol, setFilterRol] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [tablePage, setTablePage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsListLoading(true);
      try {
        const list = await fetchPersonasRequest();
        if (!cancelled) {
          setPersonas(list);
        }
      } catch (error) {
        if (!cancelled) {
          showError(getRequestErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setIsListLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [showError]);

  const filteredPersonas = useMemo(
    () =>
      personas.filter((persona) => {
        const matchesRol = filterRol === "todos" || persona.rol.toLowerCase() === filterRol;
        const matchesEstado = filterEstado === "todos" || persona.estado.toLowerCase() === filterEstado;
        return matchesRol && matchesEstado;
      }),
    [personas, filterRol, filterEstado],
  );

  useEffect(() => {
    setTablePage(1);
  }, [filterRol, filterEstado]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredPersonas.length / PERSONA_ROWS_PER_PAGE));
    if (tablePage > totalPages) {
      setTablePage(totalPages);
    }
  }, [filteredPersonas.length, tablePage]);

  const onOpenCreate = useCallback(() => {
    setEditingPersona(null);
    setModalOpen(true);
  }, []);

  const onOpenEdit = useCallback((persona: PersonaSummary) => {
    setEditingPersona(parsePersonaSummaryToFormValues(persona));
    setModalOpen(true);
  }, []);

  const onOpenDetail = useCallback((persona: PersonaSummary) => {
    setSelectedPersona(persona);
    setDetailOpen(true);
  }, []);

  const onCloseDetail = useCallback(() => {
    setDetailOpen(false);
  }, []);

  const onDetailExited = useCallback(() => {
    setSelectedPersona(null);
  }, []);

  const onEditFromDetail = useCallback((persona: PersonaSummary) => {
    setDetailOpen(false);
    setSelectedPersona(persona);
    setEditingPersona(parsePersonaSummaryToFormValues(persona));
    setModalOpen(true);
  }, []);

  const onAskDelete = useCallback((persona: PersonaSummary) => {
    setPersonaToDelete(persona);
  }, []);

  const onCancelDelete = useCallback(() => {
    if (isDeleting) return;
    setPersonaToDelete(null);
  }, [isDeleting]);

  const onConfirmDelete = useCallback(async () => {
    if (!personaToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const deletedName = personaToDelete.nombre;
      await deletePersonaRequest(personaToDelete.id);
      setPersonas((current) => current.filter((item) => item.id !== personaToDelete.id));
      setPersonaToDelete(null);
      showSuccess(`Persona ${deletedName} eliminada correctamente.`);
    } catch (error) {
      showError(getRequestErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }, [personaToDelete, isDeleting, showSuccess, showError]);

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingPersona(null);
  }, []);

  const onSavePersona = useCallback(
    async (payload: PersonaPayload, formData: FormData) => {
      try {
        const saved = await createPersonaRequest(payload, formData);
        setPersonas((prev) => {
          if (payload.id) {
            return prev.map((p) => (p.id === payload.id ? saved : p));
          }
          return [...prev, saved];
        });
        showSuccess(payload.id ? "Persona actualizada correctamente." : "Persona creada correctamente.");
        setModalOpen(false);
        setEditingPersona(null);
      } catch (error) {
        showError(getRequestErrorMessage(error));
        throw error;
      }
    },
    [showSuccess, showError],
  );

  return {
    filteredPersonas,
    isListLoading,
    modalOpen,
    editingPersona,
    detailOpen,
    selectedPersona,
    personaToDelete,
    isDeleting,
    filterRol,
    filterEstado,
    tablePage,
    setFilterRol,
    setFilterEstado,
    setTablePage,
    onOpenCreate,
    onOpenEdit,
    onOpenDetail,
    onCloseDetail,
    onDetailExited,
    onEditFromDetail,
    onAskDelete,
    onCancelDelete,
    onConfirmDelete,
    onCloseModal,
    onSavePersona,
  };
}
