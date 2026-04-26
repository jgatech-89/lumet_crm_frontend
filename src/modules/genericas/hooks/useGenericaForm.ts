import { useCallback, useEffect, useState } from "react";
import { createGenericaRequest, updateGenericaRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import type { Generica } from "../types/genericas.types";

interface UseGenericaFormParams {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  mode: "create" | "edit";
  initialData?: Generica;
}

export function useGenericaForm({ open, onClose, onCreated, mode, initialData }: UseGenericaFormParams) {
  const { showSuccess, showError } = useSnackbar();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if(initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion ?? "");
    } else {
      setNombre("");
      setDescripcion("");
    }
    setNombreError("");
  }, [open, initialData]);

  const handleClose = useCallback(() => {
    if (saving) return;
    onClose();
  }, [saving, onClose]);

  const handleNombreChange = useCallback((value: string) => {
    setNombre(value);
    setNombreError((prev) => (prev ? "" : prev));
  }, []);

  const handleSubmit = useCallback(async () => {
    const trimmed = nombre.trim();
    if (!trimmed) {
      setNombreError("El nombre es obligatorio");
      return;
    }
    setNombreError("");
    setSaving(true);
    try {
      if(mode === "create") {
        const message = await createGenericaRequest({
          nombre: trimmed,
          descripcion: descripcion.trim(),
        });
        showSuccess(message);
        onCreated();
        onClose();
      } else {
        const message = await updateGenericaRequest({
          id: initialData?.id ?? 0,
          nombre: trimmed,
          descripcion: descripcion.trim(),
        });
        showSuccess(message);
        onCreated();
        onClose();
      }
    } catch (err) {
      showError(getRequestErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }, [nombre, descripcion, showSuccess, showError, onCreated, onClose, mode, initialData]);

  return {
    nombre,
    descripcion,
    nombreError,
    saving,
    handleClose,
    handleNombreChange,
    setDescripcion,
    handleSubmit,
  };
}
