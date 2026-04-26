import { TableHead, TableRow, TableCell } from "@mui/material";
import { tableStyles } from "../styles/table.styles";
import type { Column } from "./TableRow";

interface Props<T> {
  columns: Column<T>[];
  hasActions?: boolean;
  actionsColumnLabel?: string;
}

export const TableHeader = <T,>({
  columns,
  hasActions,
  actionsColumnLabel = "Opciones",
}: Props<T>) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell key={String(col.key)} sx={tableStyles.headerCell}>
            {String(col.label)}
          </TableCell>
        ))}

        {hasActions && (
          <TableCell
            sx={{
              ...tableStyles.headerCell,
              textAlign: "center",
              width: "132px",
              px: 1.5,
            }}
          >
            {actionsColumnLabel}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
