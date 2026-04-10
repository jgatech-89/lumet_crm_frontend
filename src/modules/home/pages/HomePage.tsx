import { Layout } from "../../general";
import { Table } from "../../general/Tables/components/Table";
import VisibilityIcon from "@mui/icons-material/Visibility";

//  Tipamos la entidad
type Persona = {
  id: number;
  nombre: string;
  rol: string;
  email: string;
  estado: string;
  telefono: number;
};

//  Data tipada
const personas: Persona[] = [
  {
    id: 1,
    nombre: "Marc Soler",
    rol: "Supervisor",
    email: "m.soler@lumet.pro",
    telefono:3002403508,
    estado: "Activo",
    
  },
  {
    id: 2,
    nombre: "Lucía Beltrán",
    rol: "Comercial",
    email: "l.beltran@lumet.pro",
    telefono: 3018931035,
    estado: "Activo",
    
  },
];

export function HomePage() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
  };

  return (
    <Layout searchPlaceholder="Buscar" onSearch={handleSearch}>
      <Table<Persona>
          data={personas}
          rowsPerPage={10} // aqui ponen la paginación 
          columns={[
            { key: "nombre", label: "Persona" },
            { key: "rol", label: "Rol" },
            { key: "email", label: "Información de contacto" },
            { key: "estado", label: "Estado" },
          ]}
          actions={[
            {
              label: "Ver",
              icon: <VisibilityIcon />,
              onClick: (row) => console.log(row),
            },
          ]}

      />
    </Layout>
  );
}