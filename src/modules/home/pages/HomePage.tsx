import { Box } from "@mui/material";
import { Navbar } from "./../../general/Navbar/components/Navbar";
import { Footer } from "./../../general/Footer/components/Footer";

export function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aquí puedes implementar la lógica de búsqueda
    // Por ejemplo: buscar por nombres, cédulas, clientes, etc.
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        searchPlaceholder="Buscar por cédula "
        onSearch={handleSearch}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Footer />
    </Box>
  );
}