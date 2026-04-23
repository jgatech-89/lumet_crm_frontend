import { Edit, Visibility } from "@mui/icons-material";
import type { Action } from "@/shared/ui/table/components/TableRow";
import type { Generica } from "../types/genericas.types";

type Props = {
  onEdit: (row: Generica) => void;
  onView: (row: Generica) => void;
};

export const getGenericaActions = ({
  onEdit,
  onView,
}: Props): Action<Generica>[] => [
    {
      label: "Ver",
      icon: <Visibility color="success" sx={{ "&:hover": { color: "#008000" } }} />,
      onClick: onView,
    },
    {
      label: "Editar",
      icon: <Edit color="primary" sx={{ "&:hover": { color: "#1976d2" } }} />,
      onClick: onEdit,
    },
    // {
    //   label: "Eliminar",
    //   icon: <Delete color="error" />,
    //   onClick: onDelete,
    // },
  ];