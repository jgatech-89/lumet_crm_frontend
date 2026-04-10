import { TableRow as MuiRow, TableCell } from "@mui/material";
import { ActionIconButton } from "@/modules/general";
import { ReactNode } from "react";
import { tableStyles } from "../styles/table.styles";

// Tipado de columna
export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
}

// Tipado de acciones
export interface Action<T> {
  label: string;
  icon: ReactNode;
  colorHex?: string;
  onClick: (row: T) => void;
}

// Props del componente
interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
  actions?: Action<T>[];
}

export const TableRow = <T extends { id?: string | number },>({
  row,
  columns,
  actions,
}: TableRowProps<T>) => {
  return (
    <MuiRow sx={tableStyles.row} key={row.id ?? JSON.stringify(row)}>
      {columns.map((col) => (
        <TableCell sx={tableStyles.cell} key={String(col.key)}>
          {col.render
            ? col.render(row)
            : (row[col.key] as ReactNode)}
        </TableCell>
      ))}

      {actions && actions.length > 0 && (
        <TableCell>
          {actions.map((action, i) => (
            <ActionIconButton
              key={`${action.label}-${i}`}
              label={action.label}
              icon={action.icon}
              colorHex={action.colorHex}
              onClick={() => action.onClick(row)}
            />
          ))}
        </TableCell>
      )}
    </MuiRow>
  );
};