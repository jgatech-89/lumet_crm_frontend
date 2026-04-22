import { useEffect, useMemo, useState } from "react";
import { listGenericasRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import type { Generica } from "../types/genericas.types";
import type { SortOrder } from "../components/GenericasFilters";

export function useGenericasPage() {
  const [genericas, setGenericas] = useState<Generica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    setLoading(true);
    listGenericasRequest()
      .then(setGenericas)
      .catch((err) => setError(getRequestErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const sortedGenericas = useMemo(() => {
    return [...genericas].sort((a, b) => {
      const cmp = a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" });
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [genericas, sortOrder]);


  return { genericas: sortedGenericas, loading, error, sortOrder, setSortOrder };
}
