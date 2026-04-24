import { useCallback, useEffect, useMemo, useState } from "react";
import { listGenericasRequest, listValoresGenericaRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import type { Generica, ValorGenerica } from "../types/genericas.types";
import type { SortOrder } from "../components/GenericasFilters";
import type { ApiPagination } from "@/core/api/types";

export function useGenericas() {
  const [genericas, setGenericas] = useState<Generica[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [openModal, setOpenModal] = useState(false);
  const [selectedGenerica, setSelectedGenerica] = useState<Generica | null>(null);
  const [pagination, setPagination] = useState<ApiPagination | null>(null);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openModalGenericaList, setOpenModalGenericaList] = useState(false);
  const [genericaName, setGenericaName] = useState<string | null>(null);
  const [idGenerica, setIdGenerica] = useState<number | null>(null);
  const [valoresGenerica, setValoresGenerica] = useState<ValorGenerica[]>([]);
  const [loadingValoresGenerica, setLoadingValoresGenerica] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listGenericasRequest({ page })
      .then((response) => {
        if (cancelled) return;
        setGenericas(response.data);
        setPagination(response.pagination);
      })
      .catch((err) => {
        if (!cancelled) setError(getRequestErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, refreshKey]);

  useEffect(() => {
    if (!openModalGenericaList || idGenerica == null || idGenerica <= 0) {
      return;
    }

    let cancelled = false;
    setLoadingValoresGenerica(true);
    setValoresGenerica([]);

    listValoresGenericaRequest({ generica: idGenerica })
      .then((response) => {
        if (!cancelled) setValoresGenerica(response.data);
      })
      .catch(() => {
        if (!cancelled) setValoresGenerica([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingValoresGenerica(false);
      });

    return () => {
      cancelled = true;
    };
  }, [openModalGenericaList, idGenerica]);

  const closeModalGenericaList = useCallback(() => {
    setOpenModalGenericaList(false);
    setIdGenerica(null);
    setGenericaName(null);
    setValoresGenerica([]);
    setLoadingValoresGenerica(false);
  }, []);

  const refetchGenericas = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const sortedGenericas = useMemo(() => {
    return [...genericas].sort((a, b) => {
      return sortOrder === "asc"
        ? a.id - b.id
        : b.id - a.id;
    });
  }, [genericas, sortOrder]);

  const filteredGenericas = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return sortedGenericas;
    }
    return sortedGenericas.filter((item) =>
      item.nombre?.toLowerCase().includes(normalizedQuery)
    );
  }, [sortedGenericas, searchQuery]);
  
  const handleModalCreate = () => {
    setMode("create");
    setSelectedGenerica(null);
    setOpenModal(true);
  };

  const handleModalEdit = (generica: Generica) => {
    setMode("edit");
    setSelectedGenerica(generica);
    setOpenModal(true);
  };

  return {
    openModalGenericaList,
    setOpenModalGenericaList,
    genericas: filteredGenericas,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    sortOrder,
    setSortOrder,
    refetchGenericas,
    pagination,
    setPage,
    handleModalCreate,
    handleModalEdit,
    mode,
    selectedGenerica,
    openModal,
    setOpenModal,
    genericaName,
    setGenericaName,
    idGenerica,
    setIdGenerica,
    valoresGenerica,
    loadingValoresGenerica,
    closeModalGenericaList,
  };
}
