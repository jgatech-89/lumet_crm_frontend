import { useCallback, useEffect, useMemo, useState } from "react";
import { listGenericasRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import type { Generica } from "../types/genericas.types";
import type { SortOrder } from "../components/GenericasFilters";
import type { ApiPagination } from "@/core/api/types";

export function useGenericasPage() {
  const [genericas, setGenericas] = useState<Generica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState<ApiPagination | null>(null);
  const [, setPage] = useState(1);
  const [limit, setLimit] = useState(pagination?.limit ?? 10);


  const refetchGenericas = useCallback(() => {
    setLoading(true);
    setError(null);
    listGenericasRequest()
      .then((response) => {
        setGenericas(response.data);
        setPagination(response.pagination);
      })
      .catch((err) => setError(getRequestErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetchGenericas();
  }, [refetchGenericas]);

  const sortedGenericas = useMemo(() => {
    return [...genericas].sort((a, b) => {
      const cmp = a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" });
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [genericas, sortOrder]);


  return {
    genericas: sortedGenericas,
    loading,
    error,
    sortOrder,
    setSortOrder,
    openModal,
    setOpenModal,
    refetchGenericas,
    pagination,
    setPage,
    limit,
    setLimit,
  };
}
