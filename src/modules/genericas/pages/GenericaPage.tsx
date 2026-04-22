import { Box, CircularProgress } from "@mui/material";
import { Layout } from "@/shared/layout";
import { Table } from "@/shared/ui/table";
import { useGenericasPage } from "../hooks/useGenericasPage";
import type { Column } from "@/shared/ui/table";
import type { Generica } from "../types/genericas.types";
import { Edit } from "@mui/icons-material";
import { GenericasHeader } from "../components/GenericasHeader";
import { GenericasFilters } from "../components/GenericasFilters";

const columns: Column<Generica>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
];
const actions = [
  {
    label: "Editar",
    icon: <Edit color="primary" />,
    onClick: () => {},
  },
];

export function GenericaPage() {
  const { genericas, loading, sortOrder, setSortOrder } = useGenericasPage();

  return (
    <Layout>
      <GenericasHeader onNuevaGenerica={() => {}} />
      <GenericasFilters sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table data={genericas} columns={columns} rowsPerPage={10} actions={actions} />
      )}
    </Layout>
  );
}
