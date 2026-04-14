import { useState } from "react";

export function useTable() {
  const [page, setPage] = useState(1);

  return { page, setPage };
}
