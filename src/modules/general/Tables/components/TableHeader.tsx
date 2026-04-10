import { TableHead, TableRow, TableCell } from "@mui/material";
import { Column } from "./TableRow";
import { tableStyles } from "../styles/table.styles";

interface Props<T> {
  columns: Column<T>[];
  hasActions?: boolean;
}

export const TableHeader = <T,>({
  columns,
  hasActions,
}: Props<T>) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={String(col.key)}
            sx={tableStyles.headerCell}
          >
            {col.label}
          </TableCell>
        ))}

        {hasActions && (
          <TableCell sx={tableStyles.headerCell}>
            Opciones
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};