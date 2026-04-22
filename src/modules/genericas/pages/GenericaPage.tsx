import { Box, CircularProgress } from "@mui/material";
import { Layout } from "@/shared/layout";
import { Table } from "@/shared/ui/table";
import { useGenericasPage } from "../hooks/useGenericasPage";
import { Edit } from "@mui/icons-material";
import { GenericasHeader } from "../components/GenericasHeader";
import { GenericasFilters } from "../components/GenericasFilters";
import { NuevaGenericaModal } from "../components/NuevaGenericaModal";

const actions = [
  {
    label: "Editar",
    icon: <Edit color="primary" />,
    onClick: () => { },
  },
];

export function GenericaPage() {
  const {
    genericas,
    loading,
    sortOrder,
    setSortOrder,
    openModal,
    setOpenModal,
    refetchGenericas,
    pagination,
    setPage,
  } = useGenericasPage();

  return (
    <Layout>
      <GenericasHeader onNuevaGenerica={() => setOpenModal(true)} />
      <GenericasFilters sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table
          data={genericas}
          columnsConfig={[
            { key: "nombre", label: "Nombre" },
            { key: "descripcion", label: "Descripción" },
          ]}
          actions={actions}
          pagination={pagination}
          onPageChange={setPage}
          actionsColumnLabel="ACCIONES"
        />
      )}
      <NuevaGenericaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={refetchGenericas}
      />
    </Layout>
  );
}
