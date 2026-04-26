import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import {
  createPermisoGenericaRequest,
  deletePermisoGenericaRequest,
} from "../api/permisosGenericaApi";
import {
  deleteValorGenericaRequest,
  getValorGenericaDetailRequest,
  listAllGenericasRequest,
  listValoresGenericaConPermisoRequest,
} from "../api/genericasApi";
import type {
  Generica,
  ValorGenerica,
  ValorGenericaConPermiso,
  ValorGenericaDetail,
} from "../types/genericas.types";
import { getGenericaValuesActions } from "../utils/genericaActions";

export function useValoresGenericas(
  listModalOpen: boolean,
  refetchValoresGenerica: () => void,
) {
  const [detailValorId, setDetailValorId] = useState<number | null>(null);
  const [valorGenericaDetail, setValorGenericaDetail] = useState<ValorGenericaDetail | null>(null);
  const [loadingValorGenericaDetail, setLoadingValorGenericaDetail] = useState(false);
  const [errorValorGenericaDetail, setErrorValorGenericaDetail] = useState<string | null>(null);

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deleteTargetNombre, setDeleteTargetNombre] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [valorGenericaModalOpen, setValorGenericaModalOpen] = useState(false);
  const [valorGenericaModalMode, setValorGenericaModalMode] = useState<"create" | "edit">("create");
  const [valorGenericaModalInitial, setValorGenericaModalInitial] = useState<ValorGenericaDetail | null>(
    null,
  );
  const [valorGenericaModalEditLoading, setValorGenericaModalEditLoading] = useState(false);
  const valorModalEditFetchSeq = useRef(0);

  const [asignarRelacionOpen, setAsignarRelacionOpen] = useState(false);
  const permisosTargetValorRef = useRef<ValorGenerica | null>(null);
  const [parametroGenerica, setParametroGenerica] = useState<Generica | null>(null);
  const [genericaPickerOpen, setGenericaPickerOpen] = useState(false);
  const [genericasParaPicker, setGenericasParaPicker] = useState<Generica[]>([]);
  const [loadingGenericasPicker, setLoadingGenericasPicker] = useState(false);
  const [valoresConPermiso, setValoresConPermiso] = useState<ValorGenericaConPermiso[]>([]);
  const [loadingValoresConPermiso, setLoadingValoresConPermiso] = useState(false);

  const { showSuccess, showError } = useSnackbar();

  useEffect(() => {
    if (detailValorId == null || detailValorId <= 0) {
      return;
    }

    let cancelled = false;
    setLoadingValorGenericaDetail(true);
    setErrorValorGenericaDetail(null);
    setValorGenericaDetail(null);

    getValorGenericaDetailRequest(detailValorId)
      .then((data) => {
        if (!cancelled) setValorGenericaDetail(data);
      })
      .catch((err) => {
        if (!cancelled) setErrorValorGenericaDetail(getRequestErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoadingValorGenericaDetail(false);
      });

    return () => {
      cancelled = true;
    };
  }, [detailValorId]);

  useEffect(() => {
    if (!listModalOpen) {
      setDetailValorId(null);
      setValorGenericaDetail(null);
      setErrorValorGenericaDetail(null);
      setLoadingValorGenericaDetail(false);
      setDeleteTargetId(null);
      setDeleteTargetNombre(null);
      setDeleteError(null);
      setDeleteLoading(false);
      valorModalEditFetchSeq.current += 1;
      setValorGenericaModalOpen(false);
      setValorGenericaModalMode("create");
      setValorGenericaModalInitial(null);
      setValorGenericaModalEditLoading(false);
      setAsignarRelacionOpen(false);
      permisosTargetValorRef.current = null;
      setParametroGenerica(null);
      setGenericaPickerOpen(false);
      setGenericasParaPicker([]);
      setLoadingGenericasPicker(false);
      setValoresConPermiso([]);
      setLoadingValoresConPermiso(false);
    }
  }, [listModalOpen]);

  const closeAsignarRelacion = useCallback(() => {
    setAsignarRelacionOpen(false);
    permisosTargetValorRef.current = null;
    setParametroGenerica(null);
    setGenericaPickerOpen(false);
    setGenericasParaPicker([]);
    setValoresConPermiso([]);
    setLoadingValoresConPermiso(false);
  }, []);

  const openAsignarRelacion = useCallback((row: ValorGenerica) => {
    permisosTargetValorRef.current = row;
    setParametroGenerica(null);
    setGenericaPickerOpen(false);
    setGenericasParaPicker([]);
    setValoresConPermiso([]);
    setLoadingValoresConPermiso(false);
    setAsignarRelacionOpen(true);
  }, []);

  const openGenericaPicker = useCallback(() => {
    setGenericaPickerOpen(true);
  }, []);

  const closeGenericaPicker = useCallback(() => {
    setGenericaPickerOpen(false);
  }, []);

  const onActionPermisoSecundarioFila = useCallback(
    async (row: ValorGenericaConPermiso) => {
      const principalId = permisosTargetValorRef.current?.id;
      if (principalId == null || principalId <= 0) {
        showError("No hay valor principal para la relación.");
        return;
      }
      if (parametroGenerica == null) {
        showError("Selecciona un parámetro (genérica) en el listado.");
        return;
      }
      setLoadingValoresConPermiso(true);
      try {
        let message: string;
        if (row.permiso > 0) {
          message = await deletePermisoGenericaRequest(row.permiso);
        } else {
          message = await createPermisoGenericaRequest({
            principal: principalId,
            secundario: row.id,
          });
        }
        const rows = await listValoresGenericaConPermisoRequest({
          principalId,
          genericaId: parametroGenerica.id,
        });
        setValoresConPermiso(rows);
        showSuccess(message);
      } catch (err) {
        showError(getRequestErrorMessage(err));
      } finally {
        setLoadingValoresConPermiso(false);
      }
    },
    [parametroGenerica, showError, showSuccess],
  );

  const onSelectParametroGenerica = useCallback(
    async (g: Generica) => {
      setParametroGenerica(g);
      setGenericaPickerOpen(false);
      const principalId = permisosTargetValorRef.current?.id;
      if (principalId == null || principalId <= 0) {
        return;
      }
      setValoresConPermiso([]);
      setLoadingValoresConPermiso(true);
      try {
        const rows = await listValoresGenericaConPermisoRequest({
          principalId,
          genericaId: g.id,
        });
        setValoresConPermiso(rows);
      } catch (err) {
        setValoresConPermiso([]);
        showError(getRequestErrorMessage(err));
      } finally {
        setLoadingValoresConPermiso(false);
      }
    },
    [showError],
  );

  useEffect(() => {
    if (!genericaPickerOpen) {
      return;
    }

    let cancelled = false;
    setLoadingGenericasPicker(true);
    setGenericasParaPicker([]);

    const run = async () => {
      try {
        const all = await listAllGenericasRequest();
        if (!cancelled) {
          setGenericasParaPicker(all);
        }
      } catch (err) {
        if (!cancelled) {
          showError(getRequestErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoadingGenericasPicker(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [genericaPickerOpen, showError]);

  const parametroGenericaDisplay = useMemo(
    () =>
      parametroGenerica != null
        ? `${parametroGenerica.id} - ${parametroGenerica.nombre}`
        : "",
    [parametroGenerica],
  );

  const closeValorGenericaModal = useCallback(() => {
    valorModalEditFetchSeq.current += 1;
    setValorGenericaModalOpen(false);
    setValorGenericaModalMode("create");
    setValorGenericaModalInitial(null);
    setValorGenericaModalEditLoading(false);
  }, []);

  const openValorGenericaModalCreate = useCallback(() => {
    valorModalEditFetchSeq.current += 1;
    setValorGenericaModalMode("create");
    setValorGenericaModalInitial(null);
    setValorGenericaModalEditLoading(false);
    setValorGenericaModalOpen(true);
  }, []);

  const openValorGenericaModalEdit = useCallback(
    (row: ValorGenerica) => {
      const seq = ++valorModalEditFetchSeq.current;
      setValorGenericaModalMode("edit");
      setValorGenericaModalInitial(null);
      setValorGenericaModalEditLoading(true);
      setValorGenericaModalOpen(true);

      getValorGenericaDetailRequest(row.id)
        .then((detail) => {
          if (valorModalEditFetchSeq.current !== seq) return;
          if (!detail) {
            showError("No se pudo cargar el valor genérico.");
            setValorGenericaModalOpen(false);
            setValorGenericaModalMode("create");
            setValorGenericaModalEditLoading(false);
            return;
          }
          setValorGenericaModalInitial(detail);
        })
        .catch((err) => {
          if (valorModalEditFetchSeq.current !== seq) return;
          showError(getRequestErrorMessage(err));
          setValorGenericaModalOpen(false);
          setValorGenericaModalMode("create");
        })
        .finally(() => {
          if (valorModalEditFetchSeq.current !== seq) return;
          setValorGenericaModalEditLoading(false);
        });
    },
    [showError],
  );

  const closeDetailValor = useCallback(() => {
    setDetailValorId(null);
    setValorGenericaDetail(null);
    setErrorValorGenericaDetail(null);
    setLoadingValorGenericaDetail(false);
  }, []);

  const closeDeleteValorConfirm = useCallback(() => {
    if (deleteLoading) return;
    setDeleteTargetId(null);
    setDeleteTargetNombre(null);
    setDeleteError(null);
  }, [deleteLoading]);

  const confirmDeleteValor = useCallback(async () => {
    if (deleteTargetId == null) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const apiMessage = await deleteValorGenericaRequest(deleteTargetId);
      showSuccess(apiMessage);
      if (detailValorId === deleteTargetId) {
        closeDetailValor();
      }
      refetchValoresGenerica();
      setDeleteTargetId(null);
      setDeleteTargetNombre(null);
    } catch (err) {
      setDeleteError(getRequestErrorMessage(err));
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteTargetId, detailValorId, refetchValoresGenerica, closeDetailValor, showSuccess]);

  const actionsValues = useMemo(
    () =>
      getGenericaValuesActions({
        onEdit: (row: ValorGenerica) => {
          openValorGenericaModalEdit(row);
        },
        onView: (row) => {
          setDetailValorId(row.id);
        },
        onDelete: (row: ValorGenerica) => {
          setDeleteTargetId(row.id);
          setDeleteTargetNombre(row.nombre ?? null);
          setDeleteError(null);
        },
        onPermisos: (row: ValorGenerica) => {
          openAsignarRelacion(row);
        },
      }),
    [openAsignarRelacion, openValorGenericaModalEdit],
  );

  return {
    actionsValues,
    detailValorId,
    closeDetailValor,
    valorGenericaDetail,
    loadingValorGenericaDetail,
    errorValorGenericaDetail,
    deleteConfirmOpen: deleteTargetId != null,
    deleteTargetNombre,
    deleteLoading,
    deleteError,
    closeDeleteValorConfirm,
    confirmDeleteValor,
    valorGenericaModalOpen,
    valorGenericaModalMode,
    valorGenericaModalInitial,
    openValorGenericaModalCreate,
    closeValorGenericaModal,
    valorGenericaModalEditLoading,
    asignarRelacionOpen,
    closeAsignarRelacion,
    genericaPickerOpen,
    openGenericaPicker,
    closeGenericaPicker,
    parametroGenericaDisplay,
    genericasParaPicker,
    loadingGenericasPicker,
    onSelectParametroGenerica,
    valoresConPermiso,
    loadingValoresConPermiso,
    onActionPermisoSecundarioFila,
  };
}
