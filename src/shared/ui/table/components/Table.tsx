import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  Box,
} from "@mui/material";
import { tableStyles } from "../styles/table.styles";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TablePagination } from "./TablePagination";
import { TableFilters } from "./TableFilters";
import type { Column, Action } from "./TableRow";
import type { FilterConfig } from "./TableFilters";
import type { ApiPagination } from "@/core/api/types";

const EMPTY_DATA: unknown[] = [];

export type ColumnsConfig<T> = {
  key: keyof T;
  label?: string;
  render?: (value: T[keyof T] | undefined, row: T) => ReactNode;
  emptyValue?: ReactNode;
};

export type TableServerPagination = ApiPagination;

function formatKeyToLabel(key: string): string {
  const withSpaces = key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  return withSpaces
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function autoGenerateColumns<T>(data: T[]): Column<T>[] {
  const first = data[0];
  if (first == null || typeof first !== "object") {
    return [];
  }

  return (Object.keys(first) as (keyof T)[]).map((key) => ({
    key,
    label: formatKeyToLabel(String(key)),
  }));
}

function columnsFromConfig<T>(config: ColumnsConfig<T>[]): Column<T>[] {
  return config.map((c) => {
    const label = c.label ?? formatKeyToLabel(String(c.key));
    if (c.render) {
      const customRender = c.render;
      return {
        key: c.key,
        label,
        renderValue: (value: T[keyof T] | undefined, row: T) =>
          customRender(value, row),
      } satisfies Column<T>;
    }
    if (c.emptyValue !== undefined) {
      const placeholder = c.emptyValue;
      return {
        key: c.key,
        label,
        renderValue: (value: T[keyof T] | undefined) =>
          value == null ? placeholder : (value as ReactNode),
      } satisfies Column<T>;
    }
    return { key: c.key, label };
  });
}

function resolveColumns<T>(
  columns: Column<T>[] | undefined,
  columnsConfig: ColumnsConfig<T>[] | undefined,
  data: T[]
): Column<T>[] {
  if (columns !== undefined) {
    return columns;
  }
  if (columnsConfig !== undefined) {
    return columnsFromConfig(columnsConfig);
  }
  return autoGenerateColumns(data);
}

export interface TableProps<T> {
  data: T[];
  columns?: Column<T>[];

  columnsConfig?: ColumnsConfig<T>[];
  actions?: Action<T>[];
  filters?: FilterConfig[];
  pagination?: ApiPagination | null;
  onPageChange?: (page: number) => void;
  actionsColumnLabel?: string;
}

export const Table = <T extends { id?: string | number },>({
  data,
  columns,
  columnsConfig,
  actions,
  filters,
  pagination,
  onPageChange,
  actionsColumnLabel,
}: TableProps<T>) => {
  const safeData = (data ?? EMPTY_DATA) as T[];

  const resolvedColumns = useMemo(
    () => resolveColumns(columns, columnsConfig, safeData),
    [columns, columnsConfig, safeData]
  );

  return (
    <Box sx={tableStyles.container}>
      {filters && <TableFilters filters={filters} />}

      <TableContainer>
        <MuiTable>
          <TableHeader
            columns={resolvedColumns}
            hasActions={!!actions}
            actionsColumnLabel={actionsColumnLabel}
          />

          <TableBody>
            {safeData.map((row) => (
              <TableRow
                key={String(row.id ?? JSON.stringify(row))}
                row={row}
                columns={resolvedColumns}
                actions={actions}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {pagination != null && (
        <Box
          sx={{
            ...tableStyles.footer,
            justifyContent: "flex-end",
          }}
        >
          <TablePagination
            pagination={pagination}
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </Box>
  );
};
