import { useEffect, useState } from "react";
import { listGenericasRequest } from "../api/genericasApi";
import { getRequestErrorMessage } from "@/core/api/client";
import type { Generica } from "../types/genericas.types";

export function useGenericasPage() {
  const [genericas, setGenericas] = useState<Generica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listGenericasRequest()
      .then(setGenericas)
      .catch((err) => setError(getRequestErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return { genericas, loading, error };
}
