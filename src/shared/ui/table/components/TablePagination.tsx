import { Box } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { tableStyles } from "../styles/table.styles";

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
  const visiblePages: number[] = [];
  const maxVisible = 5;

  let start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <Box sx={tableStyles.paginationContainer}>
      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(page === 1 ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== 1 && onPageChange(1)}
      >
        <FirstPage fontSize="small" />
      </Box>

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(page === 1 ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== 1 && onPageChange(page - 1)}
      >
        <ChevronLeft fontSize="small" />
      </Box>

      {visiblePages.map((p) => (
        <Box
          key={p}
          component="button"
          onClick={() => onPageChange(p)}
          sx={{
            ...tableStyles.paginationButton,
            ...(p === page ? tableStyles.paginationButtonActive : {}),
          }}
        >
          {p}
        </Box>
      ))}

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(page === totalPages ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== totalPages && onPageChange(page + 1)}
      >
        <ChevronRight fontSize="small" />
      </Box>

      <Box
        sx={{
          ...tableStyles.paginationIcon,
          ...(page === totalPages ? tableStyles.paginationIconDisabled : {}),
        }}
        onClick={() => page !== totalPages && onPageChange(totalPages)}
      >
        <LastPage fontSize="small" />
      </Box>
    </Box>
  );
};
