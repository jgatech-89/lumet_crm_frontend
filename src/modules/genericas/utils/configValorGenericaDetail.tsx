import { Link, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { ValorGenericaDetail } from "../types/genericas.types";

export type ValorGenericaDetailRow = {
  label: string;
  value: ReactNode;
};

function resolveArchivoUrl(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  try {
    const origin = new URL(base).origin;
    return trimmed.startsWith("/") ? `${origin}${trimmed}` : `${origin}/${trimmed}`;
  } catch {
    return trimmed;
  }
}

function hasContenido(val: string | number | null | undefined) {
  if (val == null) return false;
  return String(val).trim() !== "";
}

function textoValor(val: string | null | undefined): string {
  if (val == null) return "";
  return String(val).trim();
}

type SlotValor = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

function renderLineasValorSlot(
  labelDb: string | null | undefined,
  valorDb: string | null | undefined,
  slotObligatorio: boolean,
): ReactNode {
  const etiqueta = textoValor(labelDb);
  const valor = textoValor(valorDb);

  if (slotObligatorio && etiqueta === "" && valor === "") {
    return null;
  }

  const showEtiqueta = etiqueta !== "";
  const showValor = valor !== "";
  if (!showEtiqueta && !showValor) {
    return null;
  }

  return (
    <Stack spacing={0.75} sx={{ maxWidth: "100%" }}>
      {showEtiqueta ? (
        <Typography variant="body2" sx={{ wordBreak: "break-word", lineHeight: 1.5 }}>
          <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 600, mr: 0.75 }}>
            Etiqueta:
          </Typography>
          {etiqueta}
        </Typography>
      ) : null}
      {showValor ? (
        <Typography variant="body2" sx={{ wordBreak: "break-word", lineHeight: 1.5 }}>
          <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 600, mr: 0.75 }}>
            Valor:
          </Typography>
          {valor}
        </Typography>
      ) : null}
    </Stack>
  );
}

function filaValorConEtiqueta(
  slot: SlotValor,
  labelDb: string | null | undefined,
  valorDb: string | null | undefined,
  opcional: boolean,
): ValorGenericaDetailRow | null {
  const valor = textoValor(valorDb);
  const labelTrim = labelDb != null ? String(labelDb).trim() : "";
  if (opcional && !hasContenido(valor) && labelTrim === "") {
    return null;
  }
  return {
    label: `Valor ${slot}`,
    value: renderLineasValorSlot(labelDb, valorDb, !opcional),
  };
}

export function buildValorGenericaDetailRows(data: ValorGenericaDetail): ValorGenericaDetailRow[] {
  const {
    id,
    nombre,
    codigo,
    valor_orden,
    icono,
    descripcion,
    label_valora,
    valora,
    label_valorb,
    valorb,
    label_valorc,
    valorc,
    label_valord,
    valord,
    label_valore,
    valore,
    label_valorf,
    valorf,
    label_valorg,
    valorg,
    label_valorh,
    valorh,
    label_valori,
    valori,
    label_valorj,
    valorj,
    archivo,
  } = data;

  const rows: ValorGenericaDetailRow[] = [
    { label: "ID", value: id ?? "" },
    { label: "Nombre", value: nombre ?? "" },
    { label: "Código", value: codigo ?? "" },
    { label: "Valor orden", value: valor_orden != null ? String(valor_orden) : "" },
  ];

  if (hasContenido(icono)) {
    rows.push({ label: "Icono", value: String(icono).trim() });
  }

  rows.push({ label: "Descripción", value: descripcion ?? "" });

  const slotsFijos: [SlotValor, string | null | undefined, string | null | undefined][] = [
    ["A", label_valora, valora],
    ["B", label_valorb, valorb],
    ["C", label_valorc, valorc],
  ];
  for (const [slot, lbl, val] of slotsFijos) {
    const fila = filaValorConEtiqueta(slot, lbl, val, false);
    if (fila) rows.push(fila);
  }

  const slotsOpcionales: [SlotValor, string | null | undefined, string | null | undefined][] = [
    ["D", label_valord, valord],
    ["E", label_valore, valore],
    ["F", label_valorf, valorf],
    ["G", label_valorg, valorg],
    ["H", label_valorh, valorh],
    ["I", label_valori, valori],
    ["J", label_valorj, valorj],
  ];
  for (const [slot, lbl, val] of slotsOpcionales) {
    const fila = filaValorConEtiqueta(slot, lbl, val, true);
    if (fila) rows.push(fila);
  }

  const archivoStr = archivo != null ? String(archivo).trim() : "";
  if (archivoStr) {
    rows.push({
      label: "Archivo",
      value: (
        <Link href={resolveArchivoUrl(archivoStr)} target="_blank" rel="noopener noreferrer" underline="hover">
          Ver
        </Link>
      ),
    });
  }

  return rows;
}
