import { Navbar } from "./../../general/Navbar/components/Navbar";

export function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aquí puedes implementar la lógica de búsqueda
    // Por ejemplo: buscar por nombres, cédulas, clientes, etc.
  };

  return (
    <>
      <Navbar
        searchPlaceholder="Buscar por cédula "
        onSearch={handleSearch}
      />
    </>
  );
}