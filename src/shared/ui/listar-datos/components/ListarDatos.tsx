import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  List,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { listarDatosStyles } from "../styles/listarDatos.styles";
import type { ListarDatosProps } from "../types/listarDatos.types";
import { useListarDatos } from "../hooks/useListarDatos";
import { ListarDatosItem } from "./ListarDatosItem";

const EMPTY_DATA: unknown[] = [];

function defaultRowId<T extends { id?: string | number }>(row: T): string | number {
  if (row.id !== undefined && row.id !== null) {
    return row.id;
  }
  return JSON.stringify(row);
}

export function ListarDatos<T extends { id?: string | number }>({
  data,
  primary,
  fields,
  actions,
  loading = false,
  emptyState,
  enableSearch = false,
  searchPlaceholder = "Buscar",
  searchKeys,
  showSummary = true,
  getRowId = defaultRowId,
  selectedRowId = null,
  listMaxHeight = 320,
  dense = false,
  sx,
}: ListarDatosProps<T>) {
  const safeData = (data ?? EMPTY_DATA) as T[];

  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    totalCount,
    filteredCount,
  } = useListarDatos({
    data: safeData,
    enableSearch,
    primary,
    fields,
    searchKeys,
  });

  const showToolbar = showSummary || enableSearch;

  const emptyContent =
    emptyState ??
    (enableSearch && searchQuery.trim()
      ? "No hay resultados para la búsqueda."
      : "No hay datos para mostrar.");

  return (
    <Box sx={{ ...listarDatosStyles.root, ...sx }}>
      {showToolbar ? (
        <Box
          sx={{
            ...listarDatosStyles.toolbar,
            justifyContent: showSummary ? "space-between" : "flex-end",
          }}
        >
          {showSummary ? (
            <Typography sx={listarDatosStyles.summaryText} component="div">
              {enableSearch && searchQuery.trim()
                ? `Mostrando ${filteredCount} registro${filteredCount === 1 ? "" : "s"} de un total de ${totalCount}.`
                : `Lista — Mostrando ${filteredCount} registro${filteredCount === 1 ? "" : "s"}${totalCount !== filteredCount ? ` de ${totalCount}` : ""}.`}
            </Typography>
          ) : null}

          {enableSearch ? (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: 200, maxWidth: 280 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          ) : null}
        </Box>
      ) : null}

      <Box
        sx={{
          ...listarDatosStyles.listScroll,
          maxHeight: listMaxHeight,
        }}
      >
        {loading ? (
          <Stack spacing={0}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Box key={`listar-skel-${i}`} sx={listarDatosStyles.skeletonItem}>
                <Skeleton variant="text" width="55%" height={22} />
                <Skeleton variant="text" width="40%" height={18} />
              </Box>
            ))}
          </Stack>
        ) : filteredData.length === 0 ? (
          <Box sx={listarDatosStyles.emptyBox}>{emptyContent}</Box>
        ) : (
          <List dense={dense} sx={listarDatosStyles.list} disablePadding>
            {filteredData.map((row) => {
              const id = getRowId(row);
              const selected =
                selectedRowId != null && selectedRowId === id;
              return (
                <ListarDatosItem<T>
                  key={String(id)}
                  row={row}
                  primary={primary}
                  fields={fields}
                  actions={actions}
                  selected={selected}
                />
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}
