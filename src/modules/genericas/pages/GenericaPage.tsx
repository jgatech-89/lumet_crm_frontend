import { Box, CircularProgress } from "@mui/material";
import { Layout } from "@/shared/layout";
import { Table } from "@/shared/ui/table";
import { useGenericas } from "../hooks/useGenericas";
import { GenericasHeader } from "../components/GenericasHeader";
import { GenericasFilters } from "../components/GenericasFilters";
import { GenericaModal } from "../components/GenericaModal";
import { getGenericaActions } from "../utils/genericaActions";
import { formatAppDate } from "@/shared/utils";
import type { Generica } from "../types/genericas.types";
import { GenericaModalList } from "../components/GenericaModalList";

export function GenericaPage() {
  const {
    genericas,
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
  } = useGenericas();

  const actions = getGenericaActions({
    onEdit: (row: Generica) => {
      console.log("Editar", row);
      handleModalEdit(row);
    },
    onView: (row: Generica) => {
      console.log("Ver", row);
      setOpenModalGenericaList(true);
      setGenericaName(row.nombre ?? "");
      setIdGenerica(row.id ?? 0);
    },
  });

  return (
    <Layout>
      <GenericasHeader onNuevaGenerica={handleModalCreate} />
      <GenericasFilters sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table
          data={genericas}
          columnsConfig={[
            { key: "id", label: "ID" },
            { key: "nombre", label: "Nombre" },
            { key: "descripcion", label: "Descripción" },
            {
              key: "created_at",
              label: "Fecha de creación",
              render: (value) => formatAppDate(value as string | null | undefined, { mode: "datetime" }),
            },
          ]}
          actions={actions}
          pagination={pagination}
          onPageChange={setPage}
          actionsColumnLabel="ACCIONES"
        />
      )}
      <GenericaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={refetchGenericas}
        mode={mode}
        initialData={selectedGenerica ?? undefined}
      />

      <GenericaModalList
        open={openModalGenericaList}
        onClose={() => setOpenModalGenericaList(false)}
        genericaName={genericaName ?? ""}
      />
    </Layout>
  );
}
