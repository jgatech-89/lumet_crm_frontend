import { useMemo, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { PrimaryFieldConfig, ListFieldConfig } from "../types/listarDatos.types";
import type { UseListarDatosParams, UseListarDatosResult } from "../types/listarDatos.types";
import { normalizeFieldKeys } from "../utils/listarDatosFieldKeys";

function isPrimaryKeyBased<T extends object>(
  primary: PrimaryFieldConfig<T>
): primary is {
  key: ListFieldConfig<T>["key"];
  joinSeparator?: string;
  render?: (value: string | T[keyof T] | undefined, row: T) => ReactNode;
  emptyValue?: ReactNode;
} {
  return typeof primary === "object" && primary !== null && "key" in primary;
}

function defaultSearchKeys<T extends object>(
  primary: PrimaryFieldConfig<T>,
  fields?: ListFieldConfig<T>[]
): (keyof T)[] {
  const keys = new Set<keyof T>();
  if (isPrimaryKeyBased(primary)) {
    normalizeFieldKeys(primary.key).forEach((k) => keys.add(k));
  }
  fields?.forEach((f) => {
    normalizeFieldKeys(f.key).forEach((k) => keys.add(k));
  });
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
