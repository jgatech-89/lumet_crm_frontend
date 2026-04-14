import { TableHead, TableRow, TableCell } from "@mui/material";
import { tableStyles } from "../styles/table.styles";
import type { Column } from "./TableRow";

interface Props<T> {
  columns: Column<T>[];
  hasActions?: boolean;
}

export const TableHeader = <T,>({ columns, hasActions }: Props<T>) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell key={String(col.key)} sx={tableStyles.headerCell}>
            {col.label}
          </TableCell>
        ))}

        {hasActions && (
          <TableCell sx={tableStyles.headerCell}>Opciones</TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
