import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DescriptionIcon from "@mui/icons-material/Description";
import TaskIcon from "@mui/icons-material/Task";
import { sidebarStyles } from "../styles/sidebar.styles";
import { SidebarItemType } from "../Hooks/useSidebar";

interface Props {
  item: SidebarItemType;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  resumen: DashboardIcon,
  contratos: DescriptionIcon,
  clientes: PeopleAltIcon,
  genericas: CategoryIcon,
  personas: PersonIcon,
  tareas: TaskIcon,
  soporte: HelpOutlineIcon,
  actividades: CategoryIcon,
  home: HomeIcon,
  dashboard: DashboardIcon,
};

const normalizeKey = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const getIconKey = (item: SidebarItemType) => {
  const key = item.icono || item.codigo || item.nombre || "";
  return normalizeKey(key);
};

export const SidebarItem = ({ item }: Props) => {
  const iconKey = getIconKey(item);
  const IconComponent = iconMap[iconKey] || DashboardIcon;

  return (
    <ListItemButton sx={sidebarStyles.item}>
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>

      <ListItemText primary={item.nombre} />
    </ListItemButton>
  );
};