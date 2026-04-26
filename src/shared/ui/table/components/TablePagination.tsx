import { Box } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { tableStyles } from "../styles/table.styles";
import type { ApiPagination } from "@/core/api/types";

export interface TablePaginationProps {
  pagination: ApiPagination;
  onPageChange?: (page: number) => void;
}

export const TablePagination = ({
  pagination,
  onPageChange,
}: TablePaginationProps) => {
  const safeTotal = Math.max(0, pagination.totalPages ?? 0);
  const rawPage = Number(pagination.page);
  const reportedPage =
    Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;

  const currentPage =
    safeTotal > 0
      ? Math.min(Math.max(1, reportedPage), safeTotal)
      : Math.max(1, reportedPage);

  const effectiveHasPrev =
    safeTotal > 0 ? currentPage > 1 : Boolean(pagination.previous);
  const effectiveHasNext =
    safeTotal > 0 ? currentPage < safeTotal : Boolean(pagination.next);

  const canGoFirst = currentPage > 1 && !!onPageChange;
  const canGoLast =
    safeTotal > 0 && currentPage < safeTotal && !!onPageChange;

  const visiblePages: number[] = [];
  const maxVisible = 5;

  if (safeTotal > 0 && onPageChange) {
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(safeTotal, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) visiblePages.push(i);
    if (!visiblePages.includes(currentPage)) {
      visiblePages.length = 0;
      const s = Math.max(
        1,
        Math.min(currentPage, safeTotal) - Math.floor(maxVisible / 2)
      );
      const e = Math.min(safeTotal, s + maxVisible - 1);
      const adjustedStart = Math.max(1, e - maxVisible + 1);
      for (let i = adjustedStart; i <= e; i++) visiblePages.push(i);
    }
  }

  const goTo = (target: number) => onPageChange?.(target);
  const goPrev = () => onPageChange?.(reportedPage - 1);
  const goNext = () => onPageChange?.(reportedPage + 1);

  return (
    <Box sx={tableStyles.paginationContainer}>
      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(!canGoFirst ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => canGoFirst && goTo(1)}
      >
        <FirstPage fontSize="small" />
      </Box>

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(!effectiveHasPrev ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => effectiveHasPrev && goPrev()}
      >
        <ChevronLeft fontSize="small" />
      </Box>

      {visiblePages.map((p) => (
        <Box
          key={p}
          component="button"
          type="button"
          onClick={() => goTo(p)}
          sx={{
            ...tableStyles.paginationButton,
            ...(p === currentPage ? tableStyles.paginationButtonActive : {}),
          }}
        >
          {p}
        </Box>
      ))}

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(!effectiveHasNext ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => effectiveHasNext && goNext()}
      >
        <ChevronRight fontSize="small" />
      </Box>

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(!canGoLast ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => canGoLast && goTo(safeTotal)}
      >
        <LastPage fontSize="small" />
      </Box>
    </Box>
  );
};
