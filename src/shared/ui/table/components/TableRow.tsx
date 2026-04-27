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
  iconForRow?: (row: T) => ReactNode;
  colorHex?: string;
  colorHexForRow?: (row: T) => string | undefined;
  getLabel?: (row: T) => string;
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
        <TableCell sx={{ ...tableStyles.cell, width: "132px", px: 1 }} align="center">
          <Box sx={{ display: "flex", gap: 0.25, justifyContent: "center", alignItems: "center" }}>
            {actions.map((action, i) => {
              const icon = action.iconForRow != null ? action.iconForRow(row) : action.icon;
              const colorHex = action.colorHexForRow != null ? action.colorHexForRow(row) : action.colorHex;
              const label = action.getLabel != null ? action.getLabel(row) : action.label;
              return (
                <ActionIconButton
                  key={`${label}-${i}`}
                  label={label}
                  icon={icon}
                  colorHex={colorHex}
                  onClick={() => action.onClick(row)}
                />
              );
            })}
          </Box>
        </TableCell>
      )}
    </MuiRow>
  );
};
