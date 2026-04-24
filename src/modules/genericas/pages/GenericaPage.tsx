import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  CalendarMonthOutlined,
  StorageRounded,
} from "@mui/icons-material";
import { Layout } from "@/shared/layout";
import { Table } from "@/shared/ui/table";
import { AppSkeleton } from "@/shared/ui/loading";
import { useGenericas } from "../hooks/useGenericas";
import { GenericasHeader } from "../components/GenericasHeader";
import { GenericasFilters } from "../components/GenericasFilters";
import { GenericaModal } from "../components/GenericaModal";
import { getGenericaActions } from "../utils/genericaActions";
import { formatAppDate } from "@/shared/utils";
import type { Generica } from "../types/genericas.types";
import { GenericaModalList } from "../components/GenericaModalList";

export function GenericaPage() {
  // const totalGenericas = 128; // TODO: reemplazar con endpoint real

  const {
    genericas,
    searchQuery,
    setSearchQuery,
    loading,
    sortOrder,
    setSortOrder,
    handleModalCreate,
    handleModalEdit,
    refetchGenericas,
    pagination,
    setPage,
    mode,
    selectedGenerica,
    openModal,
    setOpenModal,
    openModalGenericaList,
    setOpenModalGenericaList,
    genericaName,
    setGenericaName,
    setIdGenerica,
    valoresGenerica,
    loadingValoresGenerica,
    closeModalGenericaList,
  } = useGenericas();

  const actions = getGenericaActions({
    onEdit: (row: Generica) => {
      handleModalEdit(row);
    },
    onView: (row: Generica) => {
      setOpenModalGenericaList(true);
      setGenericaName(row.nombre ?? "");
      setIdGenerica(row.id ?? 0);
    },
  });
  const totalRegistros = Number(pagination?.total ?? genericas.length);
  const footerSummaryText = searchQuery.trim()
    ? `Mostrando ${genericas.length} resultado(s) para "${searchQuery.trim()}"`
    : `Mostrando ${genericas.length} de ${totalRegistros} genéricas`;

  return (
    <Layout
      searchPlaceholder="Buscar genéricas..."
      onSearch={setSearchQuery}
    >
      <GenericasHeader onNuevaGenerica={handleModalCreate} />
      {loading ? (
        <AppSkeleton variant="dashboard" showTopCards tableRows={4} />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 1.5, lg: 0 },
            mb: 3,
            backgroundColor: "background.paper",
            borderRadius: "14px",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: `0 4px 12px ${alpha("#0f172a", 0.04)}`,
            px: { xs: 1.25, md: 1.75 },
            py: { xs: 1.25, md: 1.5 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <GenericasFilters sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
          </Box>

          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                backgroundColor: alpha("#cbd5e1", 0.55),
                top: 0,
                left: 0,
                right: { xs: 0, lg: "auto" },
                bottom: { xs: "auto", lg: 0 },
                width: { xs: "100%", lg: "1px" },
                height: { xs: "1px", lg: "100%" },
              },
              pl: { xs: 0, lg: 2 },
              pt: { xs: 1.2, lg: 0 },
              ml: { xs: 0, lg: 2 },
              pr: { xs: 0.4, lg: 1.2 },
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              minWidth: { xs: "100%", lg: 220 },
              gap: 1.1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: alpha("#2563eb", 0.08),
                color: alpha("#2563eb", 0.9),
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <StorageRounded fontSize="small" />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.7rem", mb: 0.25 }}>
                Total Genéricas
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.05, color: "text.primary" }}>
                {totalRegistros}
              </Typography>
              {/* <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600, fontSize: "0.72rem" }}>
                +12 este mes
              </Typography> */}
            </Box>
          </Box>
        </Box>
      )}

      {!loading && (genericas.length === 0 ? (
        <Box
          sx={{
            py: 7,
            px: 3,
            textAlign: "center",
            backgroundColor: "background.paper",
            borderRadius: "16px",
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            No hay genéricas para mostrar
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Ajusta los filtros o crea una nueva genérica para empezar.
          </Typography>
        </Box>
      ) : (
        <Table
          data={genericas}
          columnsConfig={[
            {
              key: "id",
              label: "ID",
            },
            {
              key: "nombre",
              label: "Nombre",
              render: (value) => (
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.primary", fontSize: "0.82rem" }}
                >
                  {String(value ?? "-")}
                </Typography>
              ),
            },
            {
              key: "descripcion",
              label: "Descripción",
              render: (value) => (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontStyle: "italic" }}
                >
                  {String(value ?? "Sin descripción")}
                </Typography>
              ),
            },
            {
              key: "created_at",
              label: "Fecha",
              render: (value) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <CalendarMonthOutlined sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                    {formatAppDate(value as string | null | undefined, { mode: "datetime" })}
                  </Typography>
                </Box>
              ),
            },
          ]}
          actions={actions}
          pagination={pagination}
          onPageChange={setPage}
          actionsColumnLabel="ACCIONES"
          footerSummaryText={footerSummaryText}
        />
      ))}
      <GenericaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={refetchGenericas}
        mode={mode}
        initialData={selectedGenerica ?? undefined}
      />

      <GenericaModalList
        open={openModalGenericaList}
        onClose={closeModalGenericaList}
        genericaName={genericaName ?? ""}
        valoresGenerica={valoresGenerica}
        loadingValoresGenerica={loadingValoresGenerica}
      />
    </Layout>
  );
}
