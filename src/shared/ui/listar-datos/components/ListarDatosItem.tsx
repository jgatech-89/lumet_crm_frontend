import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { ActionIconButton } from "@/shared/ui/buttons/components/ActionIconButton";
import { listarDatosStyles } from "../styles/listarDatos.styles";
import type {
  Action,
  ListFieldConfig,
  PrimaryFieldConfig,
} from "../types/listarDatos.types";
import {
  formatJoinedRowValues,
  normalizeFieldKeys,
} from "../utils/listarDatosFieldKeys";

function resolveKeyBasedDisplay<T extends object>(
  key: ListFieldConfig<T>["key"],
  joinSeparator: string | undefined,
  row: T
): { display: string | T[keyof T] | undefined } {
  const keys = normalizeFieldKeys(key);
  if (keys.length > 1) {
    const sep = joinSeparator ?? " - ";
    return { display: formatJoinedRowValues(row, keys, sep) };
  }
  return { display: row[keys[0]!] as T[keyof T] | undefined };
}

function renderPrimaryContent<T extends object>(
  primary: PrimaryFieldConfig<T>,
  row: T
): ReactNode {
  if (typeof primary === "object" && primary !== null && "key" in primary) {
    const { display } = resolveKeyBasedDisplay(
      primary.key,
      primary.joinSeparator,
      row
    );
    if (primary.render) {
      return primary.render(display, row);
    }
    const empty =
      display == null ||
      display === "" ||
      (typeof display === "string" && display.trim() === "");
    if (empty && primary.emptyValue !== undefined) {
      return primary.emptyValue;
    }
    return display as ReactNode;
  }
  return primary.render(row);
}

function renderFieldLine<T extends object>(
  field: ListFieldConfig<T>,
  row: T
): ReactNode {
  const { display } = resolveKeyBasedDisplay(
    field.key,
    field.joinSeparator,
    row
  );
  if (field.render) {
    return field.render(display, row);
  }
  const empty =
    display == null ||
    display === "" ||
    (typeof display === "string" && display.trim() === "");
  if (empty && field.emptyValue !== undefined) {
    return field.emptyValue;
  }
  return display as ReactNode;
}

function fieldStableKey<T extends object>(
  field: ListFieldConfig<T>,
  index: number
): string {
  const k = field.key;
  if (Array.isArray(k)) {
    return `${k.map(String).join("|")}-${index}`;
  }
  return `${String(k)}-${index}`;
}

interface ListarDatosItemProps<T extends { id?: string | number }> {
  row: T;
  primary: PrimaryFieldConfig<T>;
  fields?: ListFieldConfig<T>[];
  actions?: Action<T>[];
  selected?: boolean;
  dense?: boolean;
}

export function ListarDatosItem<T extends { id?: string | number }>({
  row,
  primary,
  fields,
  actions,
  selected = false,
  dense = false,
}: ListarDatosItemProps<T>) {
  return (
    <Box
      sx={[
        listarDatosStyles.listItem,
        selected ? listarDatosStyles.listItemSelected : {},
      ]}
    >
      <Box sx={listarDatosStyles.listItemContent(dense)}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography component="div" sx={listarDatosStyles.primaryText}>
            {renderPrimaryContent(primary, row)}
          </Typography>

          {fields != null && fields.length > 0 ? (
            <Stack sx={listarDatosStyles.secondaryStack}>
              {fields.map((field, i) => (
                <Typography
                  key={fieldStableKey(field, i)}
                  component="div"
                  sx={listarDatosStyles.secondaryLine}
                >
                  {renderFieldLine(field, row)}
                </Typography>
              ))}
            </Stack>
          ) : null}
        </Box>

        {actions != null && actions.length > 0 ? (
          <Box sx={listarDatosStyles.actionsBox}>
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
        ) : null}
      </Box>
    </Box>
  );
}
