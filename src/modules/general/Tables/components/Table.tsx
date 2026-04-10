import {
  Table as MuiTable,
  TableBody,
  TableContainer,
} from "@mui/material";
import { tableStyles } from "../styles/table.styles";
import { TableHeader } from "./TableHeader";
import { TableRow, Column, Action } from "./TableRow";
import { TablePagination } from "./TablePagination";
import { TableFilters } from "./TableFilters";
import { useTable } from "../hooks/useTable";

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  filters?: any;
  rowsPerPage?: number; // 🔥 control externo
}

export const Table = <T extends { id?: string | number },>({
  data,
  columns,
  actions,
  filters,
  rowsPerPage = 5,
}: TableProps<T>) => {
  const { page, setPage } = useTable();

  // 🔥 paginación local
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const total = data.length;

  const start = total === 0 ? 0 : startIndex + 1;
  const end = Math.min(startIndex + rowsPerPage, total);

  return (
    <div style={tableStyles.container}>
      {filters && <TableFilters filters={filters} />}

      <TableContainer>
        <MuiTable>
          <TableHeader columns={columns} hasActions={!!actions} />

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id ?? JSON.stringify(row)}
                row={row}
                columns={columns}
                actions={actions}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <div style={tableStyles.footer}>
        <span>
          Mostrando {start}–{end} de {total}
        </span>

        <TablePagination
          page={page}
          total={total}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};