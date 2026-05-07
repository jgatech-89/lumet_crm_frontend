import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getRequestErrorMessage } from "@/core/api/client";
import { obtenerValoresGenerica } from "@/core/js/funciones.js";
import { useAuth } from "@/core/auth/useAuth";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import type { ValorGenerica, ValorGenericaListado } from "@/modules/genericas/types/genericas.types";
import { createPersonaRequest, deletePersonaRequest, listPersonasRequest, updatePersonaRequest, setPasswordRequest } from "@/modules/persona/api/personaApi";
import { PERSONA_ROWS_PER_PAGE, ROLES_PERSONA, TIPO_IDENTIFICACION } from "@/modules/persona/constants/personaConstants";
import type { PersonaFormValues, PersonaPayload, PersonaRolOption, PersonaSummary, PersonaTipoIdentificacionOption } from "@/modules/persona/types/persona.types";
import {
  mapValorGenericaToRolPersona,
  parsePersonaSummaryToFormValues,
  personaRolesFromSummary,
  mapValorGenericaToTipoIdentificacion,
} from "@/modules/persona/utils/personaMappers";

export function usePersonaPage() {
  const { showSuccess, showError } = useSnackbar();
  const { user, fetchMe } = useAuth();
  const [personas, setPersonas] = useState<PersonaSummary[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isListRefreshing, setIsListRefreshing] = useState(false);
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
  const [rolOpciones, setRolOpciones] = useState<PersonaRolOption[]>([]);
  const [rolesCatalogLoading, setRolesCatalogLoading] = useState(true);
  const [tipoIdentificacionOpciones, setTipoIdentificacionOpciones] = useState<PersonaTipoIdentificacionOption[]>([]);
  const [tipoIdentificacionCatalogLoading, setTipoIdentificacionCatalogLoading] = useState(true);  
  const [setPasswordModalOpen, setSetPasswordModalOpen] = useState(false);
  const [personaToSetPassword, setPersonaToSetPassword] = useState<PersonaSummary | null>(null);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const detailFetchGenerationRef = useRef(0);
  const advanceDetailGeneration = useCallback(() => ++detailFetchGenerationRef.current, []);

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

  useEffect(() => {
    let cancelled = false;
    setRolesCatalogLoading(true);
    setTipoIdentificacionCatalogLoading(true);

    void (async () => {
      try {
        const [valoresRolesRaw, valoresTipoIdentificacion] = await Promise.all([
          obtenerValoresGenerica(ROLES_PERSONA),
          obtenerValoresGenerica(TIPO_IDENTIFICACION),
        ]);
        if (cancelled) return;
        const valores = valoresRolesRaw as ValorGenericaListado[];

        const opcionesTipoIdentificacion: PersonaTipoIdentificacionOption[] = (valoresTipoIdentificacion as ValorGenerica[])
          .map((v) => {
            const value = mapValorGenericaToTipoIdentificacion({
              nombre: v.nombre,
              codigo: v.codigo ?? null,
            });
            if (!value) return null;
            return { value, label: v.nombre };
          })
          .filter((item): item is PersonaTipoIdentificacionOption => item !== null);
        setTipoIdentificacionOpciones(opcionesTipoIdentificacion);
        const opciones: PersonaRolOption[] = valores.flatMap((v) => {
          const value = mapValorGenericaToRolPersona({
            nombre: v.nombre,
            codigo: v.codigo ?? null,
          });
          if (!value) return [];
          const opt: PersonaRolOption = {
            value,
            label: v.nombre,
          };
          if (v.valora != null && v.valora !== "") {
            opt.valora = v.valora;
          }
          return [opt];
        });
        setRolOpciones(opciones);
      } catch (error) {
        if (!cancelled) {
          showError(getRequestErrorMessage(error));
          setRolOpciones([]);
          setTipoIdentificacionOpciones([]);
        }
      } finally {
        if (!cancelled) {
          setRolesCatalogLoading(false);
          setTipoIdentificacionCatalogLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [showError]);

  const filteredPersonas = useMemo(
    () =>
      personas.filter((persona) => {
        const currentRoles = personaRolesFromSummary(persona);
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

  const onOpenDetail = useCallback(
    (persona: PersonaSummary) => {
      const generation = advanceDetailGeneration();
      setDetailOpen(true);
      setSelectedPersona(null);

      void (async () => {
        try {
          const list = await listPersonasRequest();
          if (detailFetchGenerationRef.current !== generation) return;
          setSelectedPersona(list.find((p) => p.id === persona.id) ?? persona);
        } catch (error) {
          if (detailFetchGenerationRef.current !== generation) return;
          showError(getRequestErrorMessage(error));
          setSelectedPersona(persona);
        }
      })();
    },
    [showError, advanceDetailGeneration],
  );

  const onCloseDetail = useCallback(() => {
    advanceDetailGeneration();
    setDetailOpen(false);
  }, [advanceDetailGeneration]);

  const onDetailExited = useCallback(() => {
    setSelectedPersona(null);
  }, []);

  const onEditFromDetail = useCallback((persona: PersonaSummary) => {
    advanceDetailGeneration();
    setDetailOpen(false);
    setSelectedPersona(persona);
    setEditingPersona(parsePersonaSummaryToFormValues(persona));
    setModalOpen(true);
  }, [advanceDetailGeneration]);

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
    if (!payload.usarPasswordAdmin && !payload.correoAuth?.trim()) {
      return "El correo auth es obligatorio.";
    }
    if (!payload.usarPasswordAdmin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.correoAuth.trim())) {
      return "Debe ingresar un correo auth válido.";
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
      const validationError = validatePersonaPayload(payload);
      if (validationError) {
        showError(validationError);
        throw new Error(validationError);
      }
      setIsListRefreshing(true);
      try {
        if (payload.id) {
          await updatePersonaRequest(payload.id, payload);
        } else {
          await createPersonaRequest(payload);
        }
        setPersonas(await listPersonasRequest());
        if (payload.id && user && String(user.id) === payload.id) {
          await fetchMe();
        }
        showSuccess(payload.id ? "Persona actualizada correctamente." : "Persona creada correctamente.");
        setModalOpen(false);
        setEditingPersona(null);
      } catch (error) {
        showError(getRequestErrorMessage(error));
        throw error;
      } finally {
        setIsListRefreshing(false);
      }
    },
    [showSuccess, showError, validatePersonaPayload, fetchMe, user],
  );

  const onOpenSetPassword = useCallback((persona: PersonaSummary) => {
    setPersonaToSetPassword(persona);
    setSetPasswordModalOpen(true);
  }, []);

  const onCloseSetPassword = useCallback(() => {
    setSetPasswordModalOpen(false);
    setPersonaToSetPassword(null);
  }, []);

  const onSavePassword = useCallback(
    async (password: string, personaId: string) => {
      if (isSettingPassword) return;
      setIsSettingPassword(true);
      try {
        await setPasswordRequest(personaId, password, password);
        showSuccess("Contraseña actualizada correctamente.");
        setSetPasswordModalOpen(false);
        setPersonaToSetPassword(null);
      } catch (error) {
        showError(getRequestErrorMessage(error));
        throw error;
      } finally {
        setIsSettingPassword(false);
      }
    },
    [isSettingPassword, showSuccess, showError],
  );

  return {
    filteredPersonas,
    isListLoading,
    isListRefreshing,
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
    rolOpciones,
    rolesCatalogLoading,
    tipoIdentificacionOpciones,
    tipoIdentificacionCatalogLoading,
    setPasswordModalOpen,
    personaToSetPassword,
    isSettingPassword,
    onOpenSetPassword,
    onCloseSetPassword,
    onSavePassword,
    isPersonasTableReady: !isListLoading && !rolesCatalogLoading,
  };
}
