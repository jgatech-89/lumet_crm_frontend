import { TableRow as MuiRow, TableCell, Box } from "@mui/material";
import { ActionIconButton } from "@/shared/ui/buttons/components/ActionIconButton";
import type { ReactNode } from "react";
import { tableStyles } from "../styles/table.styles";

export interface Column<T> {
  key: keyof T;
  label: string;
  renderValue?: (value: T[keyof T] | undefined, row: T) => ReactNode;
  render?: (row: T) => ReactNode;
}

export interface Action<T> {
  label: string;
  icon: ReactNode;
  colorHex?: string;
  onClick: (row: T) => void;
}

interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
  actions?: Action<T>[];
}

function getCellContent<T>(col: Column<T>, row: T): ReactNode {
  if (col.renderValue) {
    return col.renderValue(row[col.key] as T[keyof T] | undefined, row);
  }
  if (col.render) {
    return col.render(row);
  }
  return row[col.key] as ReactNode;
}

export const TableRow = <T extends { id?: string | number },>({
  row,
  columns,
  actions,
}: TableRowProps<T>) => {
  return (
    <MuiRow sx={tableStyles.row}>
      {columns.map((col) => (
        <TableCell sx={tableStyles.cell} key={String(col.key)}>
          {getCellContent(col, row)}
        </TableCell>
      ))}

      {actions && actions.length > 0 && (
        <TableCell align="right">
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            {actions.map((action, i) => (
              <ActionIconButton
                key={`${action.label}-${i}`}
                label={action.label}
                icon={action.icon}
                colorHex={action.colorHex}
                onClick={() => action.onClick(row)}
              />
            ))}
          </Box>
        </TableCell>
      )}
    </MuiRow>
  );
};
