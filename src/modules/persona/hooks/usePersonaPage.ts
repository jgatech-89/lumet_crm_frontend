import { useCallback, useEffect, useMemo, useState } from "react";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import { createPersonaRequest, deletePersonaRequest, listPersonasRequest, updatePersonaRequest } from "@/modules/persona/api/personaApi";
import { PERSONA_ROWS_PER_PAGE } from "@/modules/persona/constants/personaSeedData";
import type { PersonaFormValues, PersonaPayload, PersonaSummary } from "@/modules/persona/types/persona.types";
import { parsePersonaSummaryToFormValues } from "@/modules/persona/utils/personaMappers";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [tablePage, setTablePage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsListLoading(true);
      try {
        const list = await listPersonasRequest();
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
        const currentRoles = persona.roles?.length ? persona.roles : persona.rol ? [persona.rol] : [];
        const matchesRol = filterRol === "todos" || currentRoles.some((rol) => rol.toLowerCase() === filterRol);
        const matchesEstado = filterEstado === "todos" || persona.estado.toLowerCase() === filterEstado;
        const normalizedSearch = searchQuery.trim().toLowerCase();
        const matchesSearch =
          normalizedSearch.length === 0 ||
          persona.nombre.toLowerCase().includes(normalizedSearch) ||
          persona.idDocumento.toLowerCase().includes(normalizedSearch) ||
          persona.email.toLowerCase().includes(normalizedSearch) ||
          persona.telefono.toLowerCase().includes(normalizedSearch);
        return matchesRol && matchesEstado && matchesSearch;
      }),
    [personas, filterRol, filterEstado, searchQuery],
  );

  useEffect(() => {
    setTablePage(1);
  }, [filterRol, filterEstado, searchQuery]);

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

  const validatePersonaPayload = useCallback((payload: PersonaPayload): string | null => {
    if (!payload.roles?.length) {
      return "Debe seleccionar al menos un rol.";
    }
    if (!/^\+[1-9]\d{6,14}$/.test(payload.telefono.replace(/\s+/g, ""))) {
      return "Debe ingresar un número válido con prefijo internacional (ej: +34...).";
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(payload.numeroIdentificacion.trim())) {
      return "La identificación debe tener al menos 3 caracteres y solo contener letras y números.";
    }
    return null;
  }, []);

  const onSavePersona = useCallback(
    async (payload: PersonaPayload) => {
      try {
        const validationError = validatePersonaPayload(payload);
        if (validationError) {
          showError(validationError);
          throw new Error(validationError);
        }
        const saved = payload.id
          ? await updatePersonaRequest(payload.id, payload)
          : await createPersonaRequest(payload);
        setPersonas((prev) => {
          if (payload.id) {
            return prev.map((p) => (p.id === saved.id ? saved : p));
          }
          return [...prev, saved];
        });
        // Rehidrata desde backend para reflejar inmediatamente cualquier cambio derivado (roles, normalizaciones).
        const refreshed = await listPersonasRequest();
        setPersonas(refreshed);
        showSuccess(payload.id ? "Persona actualizada correctamente." : "Persona creada correctamente.");
        setModalOpen(false);
        setEditingPersona(null);
      } catch (error) {
        showError(getRequestErrorMessage(error));
        throw error;
      }
    },
    [showSuccess, showError, validatePersonaPayload],
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
    searchQuery,
    filterRol,
    filterEstado,
    tablePage,
    setFilterRol,
    setFilterEstado,
    setSearchQuery,
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
