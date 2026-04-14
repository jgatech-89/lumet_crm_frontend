import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  Box,
} from "@mui/material";
import { tableStyles } from "../styles/table.styles";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TablePagination } from "./TablePagination";
import { TableFilters } from "./TableFilters";
import { useTable } from "../hooks/useTable";
import type { Column, Action } from "./TableRow";
import type { FilterConfig } from "./TableFilters";

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  filters?: FilterConfig[];
  rowsPerPage?: number;
}

export const Table = <T extends { id?: string | number },>({
  data,
  columns,
  actions,
  filters,
  rowsPerPage = 5,
}: TableProps<T>) => {
  const { page, setPage } = useTable();

  const safeData = data ?? [];
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = safeData.slice(startIndex, startIndex + rowsPerPage);
  const total = safeData.length;
  const start = total === 0 ? 0 : startIndex + 1;
  const end = Math.min(startIndex + rowsPerPage, total);

  return (
    <Box sx={tableStyles.container}>
      {filters && <TableFilters filters={filters} />}

      <TableContainer>
        <MuiTable>
          <TableHeader columns={columns} hasActions={!!actions} />

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={String(row.id ?? JSON.stringify(row))}
                row={row}
                columns={columns}
                actions={actions}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box sx={tableStyles.footer}>
        <span>
          Mostrando {start}–{end} de {total}
        </span>

        <TablePagination
          page={page}
          total={total}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
        />
      </Box>
    </Box>
  );
};
