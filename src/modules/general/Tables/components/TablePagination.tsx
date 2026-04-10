import { tableStyles } from "../styles/table.styles";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

interface Props {
  page: number;
  total: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = ({
  page,
  total,
  rowsPerPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / rowsPerPage);

  // 🔥 rango dinámico (como en tu imagen)
  const visiblePages = [];
  const maxVisible = 5;

  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <div style={tableStyles.paginationContainer}>
      {/* ⏮ */}
      <div
        style={{
          ...tableStyles.paginationIcon,
          ...(page === 1 ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== 1 && onPageChange(1)}
      >
        <FirstPage fontSize="small" />
      </div>

      {/* ◀ */}
      <div
        style={{
          ...tableStyles.paginationIcon,
          ...(page === 1 ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== 1 && onPageChange(page - 1)}
      >
        <ChevronLeft fontSize="small" />
      </div>

      {/* páginas */}
      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            ...tableStyles.paginationButton,
            ...(p === page ? tableStyles.paginationButtonActive : {}),
          }}
        >
          {p}
        </button>
      ))}

      {/* ▶ */}
      <div
        style={{
          ...tableStyles.paginationIcon,
          ...(page === totalPages
            ? tableStyles.paginationIconDisabled
            : {}),
        }}
        onClick={() =>
          page !== totalPages && onPageChange(page + 1)
        }
      >
        <ChevronRight fontSize="small" />
      </div>

      {/* ⏭ */}
      <div
        style={{
          ...tableStyles.paginationIcon,
          ...(page === totalPages
            ? tableStyles.paginationIconDisabled
            : {}),
        }}
        onClick={() =>
          page !== totalPages && onPageChange(totalPages)
        }
      >
        <LastPage fontSize="small" />
      </div>
    </div>
  );
};