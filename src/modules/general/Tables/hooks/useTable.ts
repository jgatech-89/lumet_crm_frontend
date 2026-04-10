import { useState } from "react";

export const useTable = () => {
  const [page, setPage] = useState(1);

  return {
    page,
    setPage,
  };
};