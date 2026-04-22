import { Edit } from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import type { Column } from "@/shared/ui/table";
import type { Generica } from "../types/genericas.types";

export type TableAction<T> = {
  key: string;
  label: string;
  icon: SvgIconComponent; // 👈 guardas el componente, no JSX
  onClick: (row: T) => void;
};

type TableConfig<T> = {
  columns: Column<T>[];
  actions: TableAction<T>[];
};

export const genericasTableConfig = (
  handlers: {
    onEdit: (row: Generica) => void;
  }
): TableConfig<Generica> => ({
  columns: [
    { key: "nombre", label: "Nombre" },
    { key: "descripcion", label: "Descripción" },
  ],

  actions: [
    {
      key: "edit",
      label: "Editar",
      icon: Edit, // 👈 aquí ya NO hay JSX
      onClick: handlers.onEdit,
    },
  ],
});