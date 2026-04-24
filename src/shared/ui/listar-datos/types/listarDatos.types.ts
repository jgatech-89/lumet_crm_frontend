import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Action } from "@/shared/ui/table/components/TableRow";
import type { ListarDatosFieldKey } from "../utils/listarDatosFieldKeys";

export type { Action };

/**
 * Líneas bajo el título: mismo espíritu que `ColumnsConfig` en Table.
 * `key` puede ser un array de claves; se muestran unidas con `joinSeparator` (por defecto `" - "`).
 */
export type ListFieldConfig<T extends object> = {
  key: ListarDatosFieldKey<T>;
  /** Solo aplica cuando `key` es un array con más de una entrada. Por defecto `" - "`. */
  joinSeparator?: string;
  label?: string;
  render?: (
    value: string | T[keyof T] | undefined,
    row: T
  ) => ReactNode;
  emptyValue?: ReactNode;
};

/**
 * Título destacado del ítem: por clave o renderizado totalmente custom.
 */
export type PrimaryFieldConfig<T extends object> =
  | {
      key: ListarDatosFieldKey<T>;
      joinSeparator?: string;
      render?: (
        value: string | T[keyof T] | undefined,
        row: T
      ) => ReactNode;
      emptyValue?: ReactNode;
    }
  | {
      render: (row: T) => ReactNode;
    };

/**
 * - `embedded`: listado plano integrado en el padre (p. ej. dialog), sin caja.
 * - `card`: contenedor con borde y sombreado, útil en páginas sin modal.
 */
export type ListarDatosVariant = "embedded" | "card";

export interface ListarDatosProps<
  T extends { id?: string | number } = { id?: string | number },
> {
  data: T[];
  primary: PrimaryFieldConfig<T>;
  /** Título del resumen encima de la lista (por defecto `"Lista"`). */
  summaryTitle?: string;
  /** Líneas secundarias debajo del título (orden = orden visual). */
  fields?: ListFieldConfig<T>[];
  actions?: Action<T>[];
  loading?: boolean;
  /** Contenido completo del vacío (sustituye el mensaje por defecto). */
  emptyState?: ReactNode;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  /** Campos en los que filtra el buscador (por defecto: clave primaria + `fields`). */
  searchKeys?: (keyof T)[];
  showSummary?: boolean;
  getRowId?: (row: T) => string | number;
  selectedRowId?: string | number | null;
  listMaxHeight?: number | string;
  /**
   * Ocupa la altura disponible del contenedor (p. ej. `DialogContent` en flex)
   * y hace scroll solo en la zona de ítems, evitando doble scroll con el modal.
   */
  fillParentHeight?: boolean;
  dense?: boolean;
  /**
   * Estilo de envoltura: `embedded` (plano) por defecto, `card` con borde/fondo propio.
   */
  variant?: ListarDatosVariant;
  sx?: SxProps<Theme>;
}

export interface UseListarDatosParams<T extends object> {
  data: T[];
  enableSearch?: boolean;
  primary: PrimaryFieldConfig<T>;
  fields?: ListFieldConfig<T>[];
  searchKeys?: (keyof T)[];
}

export interface UseListarDatosResult<T> {
  filteredData: T[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalCount: number;
  filteredCount: number;
}
