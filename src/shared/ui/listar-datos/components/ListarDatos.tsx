import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Divider,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import {
  listarDivider,
  listarListScroll,
  listarRootSx,
  listarSummaryText,
  listarToolbarSx,
  listarDatosStyles,
} from "../styles/listarDatos.styles";
import type { ListarDatosProps, ListarDatosVariant } from "../types/listarDatos.types";
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
  summaryTitle = "Lista",
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
  fillParentHeight = false,
  dense = false,
  variant: variantProp = "embedded",
  sx,
}: ListarDatosProps<T>) {
  const safeData = (data ?? EMPTY_DATA) as T[];
  const variant: ListarDatosVariant = variantProp;

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

  const defaultEmptyMessage =
    enableSearch && searchQuery.trim()
      ? "No hay resultados para la búsqueda."
      : "No hay datos para mostrar.";

  const renderedEmpty =
    emptyState ?? (
      <Stack alignItems="center" spacing={1.5} sx={{ py: 1, px: 1 }}>
        <InfoOutlinedIcon sx={{ fontSize: 44, color: "text.secondary" }} aria-hidden />
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.55, maxWidth: 420, m: 0 }}
        >
          {defaultEmptyMessage}
        </Typography>
      </Stack>
    );

  return (
    <Box
      sx={[
        listarRootSx(variant),
        fillParentHeight
          ? {
              flex: 1,
              minHeight: 0,
              maxHeight: "100%",
              overflow: "hidden",
            }
          : {},
        !fillParentHeight && variant === "card" ? { my: 2 } : {},
        ...(sx != null ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {showToolbar ? (
        <Box
          sx={[
            listarToolbarSx(variant),
            {
              justifyContent: showSummary ? "space-between" : "flex-end",
              ...(fillParentHeight ? { flexShrink: 0 } : {}),
            },
          ]}
        >
          {showSummary ? (
            <Typography component="div" sx={listarSummaryText} variant="body2">
              {enableSearch && searchQuery.trim()
                ? `Mostrando ${filteredCount} registro${filteredCount === 1 ? "" : "s"} de un total de ${totalCount}.`
                : `${summaryTitle} — Mostrando ${filteredCount} registro${filteredCount === 1 ? "" : "s"}${totalCount !== filteredCount ? ` de ${totalCount}` : ""}.`}
            </Typography>
          ) : null}

          {enableSearch ? (
            <TextField
              size="small"
              color="primary"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                minWidth: 0,
                flex: "0 1 280px",
                maxWidth: { xs: "100%", sm: 280 },
                width: { xs: "100%", sm: "auto" },
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.dark",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          ) : null}
        </Box>
      ) : null}
      {showToolbar ? <Divider role="separator" component="div" sx={listarDivider} /> : null}

      <Box
        sx={{
          ...listarListScroll,
          ...(fillParentHeight
            ? {
                flex: 1,
                minHeight: 0,
                maxHeight: "none",
                overflowY: "auto" as const,
                overflowX: "hidden" as const,
                display: "flex",
                flexDirection: "column" as const,
              }
            : { maxHeight: listMaxHeight }),
        }}
      >
        {loading ? (
          <Stack>
            {Array.from({ length: 5 }).map((_, i) => (
              <Fragment key={`listar-skel-${i}`}>
                {i > 0 ? <Divider role="separator" component="div" sx={listarDivider} /> : null}
                <Box sx={listarDatosStyles.skeletonItem(dense)}>
                  <Skeleton variant="text" width="55%" height={22} />
                  <Skeleton variant="text" width="40%" height={18} />
                </Box>
              </Fragment>
            ))}
          </Stack>
        ) : filteredData.length === 0 ? (
          <Box sx={listarDatosStyles.emptyBox}>{renderedEmpty}</Box>
        ) : (
          <Stack component="div" spacing={0}>
            {filteredData.map((row, index) => {
              const id = getRowId(row);
              const selected =
                selectedRowId != null && selectedRowId === id;
              return (
                <Fragment key={String(id)}>
                  {index > 0 ? (
                    <Divider role="separator" component="div" sx={listarDivider} />
                  ) : null}
                  <ListarDatosItem<T>
                    row={row}
                    primary={primary}
                    fields={fields}
                    actions={actions}
                    selected={selected}
                    dense={dense}
                  />
                </Fragment>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
