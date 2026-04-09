import { Box } from "@mui/material";
import { Navbar } from "./../../general/Navbar/components/Navbar";
import { Footer } from "./../../general/Footer/components/Footer";
import { Sidebar } from "../../general/Sidebar/components/Sidebar";

export function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aquí puedes implementar la lógica de búsqueda
    // Por ejemplo: buscar por nombres, cédulas, clientes, etc.
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar
          searchPlaceholder="Buscar por cédula"
          onSearch={handleSearch}
        />
       <Sidebar />
        <Box sx={{ flex: 1 }} />

        <Footer />
      </Box>
    </Box>
  );
}