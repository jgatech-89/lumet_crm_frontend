import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import type React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from "@/core/theme";
import logo from "@/assets/logo-lumet.png";

export const NavbarLogo = () => {
  const { mode, toggleMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={{ xs: 0, sm: 1 }}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <img
              src={logo}
              alt="logo"
              width={24}
              height={24}
              style={{
                width: '24px',
                height: '24px',
              }}
            />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
          <img
            src={logo}
            alt="logo"
            width={24}
            height={24}
            style={{
              width: '24px',
              height: '24px',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              gap: 0.5,
              fontSize: { sm: '1.1rem', md: '1.25rem' }
            }}
          >
            <Box component="span" sx={{ color: "text.primary" }}>
              Lumet
            </Box>
            <Box component="span" sx={{ color: "primary.main" }}>
              .Pro
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* Menú desplegable para móviles */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Badge badgeContent={3} color="error" sx={{ mr: 2 }}>
            <NotificationsIcon />
          </Badge>
          Notificaciones
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Badge badgeContent={2} color="error" sx={{ mr: 2 }}>
            <MailIcon />
          </Badge>
          Mensajes
        </MenuItem>
        <MenuItem onClick={() => { toggleMode(); handleMenuClose(); }}>
          {mode === 'light' ? <DarkModeIcon sx={{ mr: 2 }} /> : <LightModeIcon sx={{ mr: 2 }} />}
          {mode === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </MenuItem>
      </Menu>
    </>
  );
};