import { EditOutlined, VisibilityOutlined } from "@mui/icons-material";
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
      icon: <VisibilityOutlined fontSize="small" />,
      colorHex: "#16a34a",
      onClick: onView,
    },
    {
      label: "Modificar valores",
      icon: <EditOutlined fontSize="small" />,
      colorHex: "#64748b",
      onClick: onEdit,
    },
    // {
    //   label: "Eliminar",
    //   icon: <Delete color="error" />,
    //   onClick: onDelete,
    // },
  ];