import { useCallback, useEffect, useState } from "react";
import { createValorGenericaRequest, updateValorGenericaRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import type { ValorGenericaDetail } from "../types/genericas.types";

const PAIRS: [string, string, string][] = [
  ["label_valora", "valora", "A"],
  ["label_valorb", "valorb", "B"],
  ["label_valorc", "valorc", "C"],
  ["label_valord", "valord", "D"],
  ["label_valore", "valore", "E"],
  ["label_valorf", "valorf", "F"],
  ["label_valorg", "valorg", "G"],
  ["label_valorh", "valorh", "H"],
  ["label_valori", "valori", "I"],
  ["label_valorj", "valorj", "J"],
];

function emptyFields(): Record<string, string> {
  const o: Record<string, string> = {
    codigo: "",
    icono: "",
    nombre: "",
    descripcion: "",
    valor_orden: "",
  };
  for (const [labelKey, valueKey] of PAIRS) {
    o[labelKey] = "";
    o[valueKey] = "";
  }
  return o;
}

function fieldsFromDetail(d: ValorGenericaDetail): Record<string, string> {
  const raw = d as unknown as Record<string, string | null | undefined>;
  const o = emptyFields();
  o.nombre = d.nombre ?? "";
  o.codigo = d.codigo ?? "";
  o.descripcion = d.descripcion ?? "";
  o.icono = d.icono ?? "";
  o.valor_orden = d.valor_orden != null ? String(d.valor_orden) : "";
  for (const [labelKey, valueKey] of PAIRS) {
    const lv = raw[labelKey];
    const vv = raw[valueKey];
    o[labelKey] = lv != null && lv !== "" ? String(lv) : "";
    o[valueKey] = vv != null && vv !== "" ? String(vv) : "";
  }
  return o;
}

type Params = {
  open: boolean;
  genericaId: number;
  onClose: () => void;
  onCreated: () => void;
  mode: "create" | "edit";
  initialData?: ValorGenericaDetail | null;
};

export function useValorGenericaForm({
  open,
  genericaId,
  onClose,
  onCreated,
  mode,
  initialData,
}: Params) {
  const { showSuccess, showError } = useSnackbar();
  const [values, setValues] = useState(emptyFields);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [nombreError, setNombreError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit") {
      if (initialData) {
        setValues(fieldsFromDetail(initialData));
      } else {
        setValues(emptyFields());
      }
    } else if (mode === "create") {
      setValues(emptyFields());
    }
    setArchivo(null);
    setNombreError("");
  }, [open, mode, initialData]);

  const setField = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "nombre") setNombreError("");
  }, []);

  const handleClose = useCallback(() => {
    if (saving) return;
    onClose();
  }, [saving, onClose]);

  const handleSubmit = useCallback(async () => {
    if (mode === "edit" && !initialData) {
      return;
    }
    const nombre = values.nombre.trim();
    if (!nombre) {
      setNombreError("El nombre es obligatorio");
      return;
    }
    setNombreError("");
    setSaving(true);
    try {
      const body: Record<string, string | number | null> = {
        generica: mode === "edit" && initialData ? initialData.generica : genericaId,
        nombre,
      };

      if (mode === "create") {
        body.estado = "1";
      }

      const optionalKeys = [
        "codigo",
        "icono",
        "descripcion",
        ...PAIRS.flatMap(([l, v]) => [l, v]),
      ] as string[];
      for (const key of optionalKeys) {
        const t = values[key]?.trim();
        if (t) body[key] = t;
      }

      const ord = values.valor_orden.trim();
      if (ord) {
        const n = parseInt(ord, 10);
        body.valor_orden = Number.isFinite(n) ? n : null;
      } else {
        body.valor_orden = null;
      }

      if (mode === "create") {
        const message = await createValorGenericaRequest(body, archivo);
        showSuccess(message);
      } else {
        const id = initialData?.id;
        if (id == null || id <= 0) {
          showError("No se pudo identificar el valor a actualizar.");
          return;
        }
        const message = await updateValorGenericaRequest({ id, fields: body, archivo });
        showSuccess(message);
      }
      onCreated();
      onClose();
    } catch (err) {
      showError(getRequestErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }, [
    values,
    archivo,
    genericaId,
    mode,
    initialData,
    showSuccess,
    showError,
    onCreated,
    onClose,
  ]);

  return {
    values,
    setField,
    archivo,
    setArchivo,
    nombreError,
    saving,
    handleClose,
    handleSubmit,
    pairs: PAIRS,
  };
}
