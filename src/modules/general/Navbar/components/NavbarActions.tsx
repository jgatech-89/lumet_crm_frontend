import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth } from "@/core/auth/useAuth";
import { useThemeMode } from "@/core/theme";
import { useNavbar } from "../hooks/useNavbar";

const getUserInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
) => {
  const firstInitial = firstName?.trim()[0]?.toUpperCase() ?? "";
  const lastInitial = lastName?.trim()[0]?.toUpperCase() ?? "";

  if (!firstInitial && !lastInitial) return "U";
  if (!lastInitial) return firstInitial;
  return `${firstInitial}${lastInitial}`;
};

export const NavbarActions = () => {
  const { anchorEl, handleMenuOpen, handleMenuClose, isMenuOpen } =
    useNavbar();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();

  const initials = getUserInitials(user?.primer_nombre, user?.primer_apellido);

  return (
    <>
      {/* Iconos de notificaciones y mensajes - solo visibles en desktop/tablet */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton>
          <Badge badgeContent={2} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Toggle de tema - solo visible en desktop/tablet */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <IconButton onClick={toggleMode} title={mode === 'light' ? 'Modo oscuro' : 'Modo claro'}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      {/* Avatar del usuario - visible en todas las pantallas */}
      <IconButton onClick={handleMenuOpen}>
        <Avatar
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            bgcolor: "primary.main",
            color: "common.white",
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 600,
          }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            logout();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};