import { useMemo, useState, useCallback } from "react";
import type { PrimaryFieldConfig, ListFieldConfig } from "../types/listarDatos.types";
import type { UseListarDatosParams, UseListarDatosResult } from "../types/listarDatos.types";

function isPrimaryKeyBased<T extends object>(
  primary: PrimaryFieldConfig<T>
): primary is {
  key: keyof T;
  render?: (value: T[keyof T] | undefined, row: T) => unknown;
  emptyValue?: unknown;
} {
  return "key" in primary;
}

function defaultSearchKeys<T extends object>(
  primary: PrimaryFieldConfig<T>,
  fields?: ListFieldConfig<T>[]
): (keyof T)[] {
  const keys = new Set<keyof T>();
  if (isPrimaryKeyBased(primary)) {
    keys.add(primary.key);
  }
  fields?.forEach((f) => keys.add(f.key));
  return Array.from(keys);
}

function rowMatchesQuery<T extends object>(
  row: T,
  keys: (keyof T)[],
  query: string
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q));
}

export function useListarDatos<T extends object>(
  params: UseListarDatosParams<T>
): UseListarDatosResult<T> {
  const {
    data,
    enableSearch = false,
    primary,
    fields,
    searchKeys: searchKeysProp,
  } = params;

  const [searchQuery, setSearchQuery] = useState("");

  const resolvedSearchKeys = useMemo(
    () =>
      searchKeysProp?.length
        ? searchKeysProp
        : defaultSearchKeys(primary, fields),
    [searchKeysProp, primary, fields]
  );

  const filteredData = useMemo(() => {
    if (!enableSearch || !searchQuery.trim()) {
      return data;
    }
    return data.filter((row) =>
      rowMatchesQuery(row, resolvedSearchKeys, searchQuery)
    );
  }, [data, enableSearch, searchQuery, resolvedSearchKeys]);

  const setSearchQueryStable = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  return {
    filteredData,
    searchQuery,
    setSearchQuery: setSearchQueryStable,
    totalCount: data.length,
    filteredCount: filteredData.length,
  };
}
