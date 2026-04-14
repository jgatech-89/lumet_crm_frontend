import { Box, CircularProgress, Typography } from "@mui/material";
import { Layout } from "@/shared/layout";
import { Table } from "@/shared/ui/table";
import { useGenericasPage } from "../hooks/useGenericasPage";
import type { Column } from "@/shared/ui/table";
import type { Generica } from "../types/genericas.types";

const columns: Column<Generica>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
];

export function GenericaPage() {
  const { genericas, loading } = useGenericasPage();

  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Genéricas
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table data={genericas} columns={columns} rowsPerPage={10} />
      )}
    </Layout>
  );
}
