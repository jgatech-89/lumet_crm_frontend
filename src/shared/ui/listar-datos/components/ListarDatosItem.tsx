import { Box, ListItem, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { ActionIconButton } from "@/shared/ui/buttons/components/ActionIconButton";
import { listarDatosStyles } from "../styles/listarDatos.styles";
import type {
  Action,
  ListFieldConfig,
  PrimaryFieldConfig,
} from "../types/listarDatos.types";

function renderPrimaryContent<T extends object>(
  primary: PrimaryFieldConfig<T>,
  row: T
): ReactNode {
  if ("key" in primary) {
    const value = row[primary.key] as T[keyof T] | undefined;
    if (primary.render) {
      return primary.render(value, row);
    }
    if (value == null && primary.emptyValue !== undefined) {
      return primary.emptyValue;
    }
    return value as ReactNode;
  }
  return primary.render(row);
}

function renderFieldLine<T extends object>(
  field: ListFieldConfig<T>,
  row: T
): ReactNode {
  const value = row[field.key] as T[keyof T] | undefined;
  if (field.render) {
    return field.render(value, row);
  }
  if (value == null && field.emptyValue !== undefined) {
    return field.emptyValue;
  }
  return value as ReactNode;
}

interface ListarDatosItemProps<T extends { id?: string | number }> {
  row: T;
  primary: PrimaryFieldConfig<T>;
  fields?: ListFieldConfig<T>[];
  actions?: Action<T>[];
  selected?: boolean;
}

export function ListarDatosItem<T extends { id?: string | number }>({
  row,
  primary,
  fields,
  actions,
  selected = false,
}: ListarDatosItemProps<T>) {
  return (
    <ListItem
      sx={{
        ...listarDatosStyles.listItem,
        ...(selected ? listarDatosStyles.listItemSelected : {}),
      }}
      selected={selected}
      disablePadding
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          px: 2,
          py: 1.25,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography component="div" sx={listarDatosStyles.primaryText}>
            {renderPrimaryContent(primary, row)}
          </Typography>

          {fields != null && fields.length > 0 ? (
            <Stack sx={listarDatosStyles.secondaryStack}>
              {fields.map((field) => (
                <Typography
                  key={String(field.key)}
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
        ) : null}
      </Box>
    </ListItem>
  );
}
