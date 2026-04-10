import { Layout } from "../../general";

export function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aquí puedes implementar la lógica de búsqueda
    // Por ejemplo: buscar por nombres, cédulas, clientes, etc.
  };

  return (
    <Layout searchPlaceholder="Buscar por cédula" onSearch={handleSearch}>
      <></>
    </Layout>
  );
}