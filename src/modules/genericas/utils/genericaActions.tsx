import { DeleteOutlined, EditOutlined, VisibilityOutlined, GppGoodOutlined } from "@mui/icons-material";
import type { Action } from "@/shared/ui/table/components/TableRow";
import type { Generica, ValorGenerica } from "../types/genericas.types";

type Props = {
  onEdit: (row: Generica) => void;
  onView: (row: Generica) => void;
};

type PropsValues = {
  onEdit: (row: ValorGenerica) => void;
  onView: (row: ValorGenerica) => void;
  onDelete: (row: ValorGenerica) => void;
  onPermisos: (row: ValorGenerica) => void;
};

export const getGenericaActions = ({
  onEdit,
  onView,
}: Props): Action<Generica>[] => [
    {
      label: "Ver",
      icon: <VisibilityOutlined fontSize="small" />,
      colorHex: "#0063B1",
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

export const getGenericaValuesActions = ({
  onEdit,
  onView,
  onDelete,
  onPermisos,
}: PropsValues): Action<ValorGenerica>[] => [
  {
    label: "Ver",
    icon: <VisibilityOutlined fontSize="medium" />,
    colorHex: "#0063B1",
    onClick: onView,
  },
  {
    label: "Modificar",
    icon: <EditOutlined fontSize="medium" />,
    colorHex: "#64748b",
    onClick: onEdit,
  },
  {
    label: "Eliminar",
    icon: <DeleteOutlined fontSize="medium" />,
    colorHex: "#ef4444",
    onClick: onDelete,
  },
  {
    label: "Permisos",
    icon: <GppGoodOutlined fontSize="medium" />,
    colorHex: "#16a34a",
    onClick: onPermisos,
  },

];