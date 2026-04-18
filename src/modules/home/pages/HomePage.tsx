import { Layout } from "@/shared/layout";

export function HomePage() {
  const handleSearch = (query: string) => {
    void query;
  };

  return (
    <Layout searchPlaceholder="Buscar por cédula" onSearch={handleSearch}>
      <></>
    </Layout>
  );
}
