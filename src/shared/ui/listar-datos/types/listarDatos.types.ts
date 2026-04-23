import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Action } from "@/shared/ui/table/components/TableRow";

export type { Action };

/**
 * Líneas bajo el título: mismo espíritu que `ColumnsConfig` en Table.
 */
export type ListFieldConfig<T> = {
  key: keyof T;
  label?: string;
  render?: (value: T[keyof T] | undefined, row: T) => ReactNode;
  emptyValue?: ReactNode;
};

/**
 * Título destacado del ítem: por clave o renderizado totalmente custom.
 */
export type PrimaryFieldConfig<T> =
  | {
      key: keyof T;
      render?: (value: T[keyof T] | undefined, row: T) => ReactNode;
      emptyValue?: ReactNode;
    }
  | {
      render: (row: T) => ReactNode;
    };

export interface ListarDatosProps<
  T extends { id?: string | number } = { id?: string | number },
> {
  data: T[];
  primary: PrimaryFieldConfig<T>;
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
  dense?: boolean;
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
