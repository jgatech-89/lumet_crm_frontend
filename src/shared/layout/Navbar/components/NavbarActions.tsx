import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { AuthUserPerfil } from "@/modules/auth/types/auth.types";
import { useAuth } from "@/core/auth/useAuth";
import { useThemeMode } from "@/core/theme";
import { useNavbar } from "../hooks/useNavbar";

// ─── Mock: reemplazar con GET /personas/{id}/perfiles/ cuando el backend esté listo ──
const MOCK_PERFILES_ADICIONALES: AuthUserPerfil[] = [
  { id: 2, nombre: "Vendedor", codigo: "VENDEDOR" },
  { id: 3, nombre: "Soporte Técnico", codigo: "SOPORTE" },
];
// ─────────────────────────────────────────────────────────────────────────────────────

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

const avatarStyles = {
  bgcolor: "primary.main",
  color: "common.white",
  fontWeight: 600,
};

export const NavbarActions = () => {
  const { anchorEl, handleMenuOpen, handleMenuClose, isMenuOpen } =
    useNavbar();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();

  const [activeProfile, setActiveProfile] = useState<AuthUserPerfil | null>(
    user?.perfil ?? null,
  );
  const [profilesOpen, setProfilesOpen] = useState(false);

  // Sincronizar perfil activo cuando el usuario carga desde la API
  useEffect(() => {
    if (user?.perfil) setActiveProfile(user.perfil);
  }, [user?.perfil]);

  // Cerrar la lista de perfiles al cerrar el menú principal
  useEffect(() => {
    if (!isMenuOpen) setProfilesOpen(false);
  }, [isMenuOpen]);

  const allProfiles: AuthUserPerfil[] = activeProfile
    ? [
        activeProfile,
        ...MOCK_PERFILES_ADICIONALES.filter((p) => p.id !== activeProfile.id),
      ]
    : MOCK_PERFILES_ADICIONALES;

  const handleSelectPerfil = (perfil: AuthUserPerfil) => {
    // TODO: integración backend — llamar a POST /auth/switch-profile/ con { perfil_id: perfil.id }
    // y actualizar user.perfil en AuthContext con la respuesta del servidor
    setActiveProfile(perfil);
    setProfilesOpen(false);
  };

  const initials = getUserInitials(user?.primer_nombre, user?.primer_apellido);
  const fullName = [user?.primer_nombre, user?.primer_apellido]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Iconos de notificaciones y mensajes - solo visibles en desktop/tablet */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
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
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <IconButton
          onClick={toggleMode}
          title={mode === "light" ? "Modo oscuro" : "Modo claro"}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      {/* Avatar del usuario - visible en todas las pantallas */}
      <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
        <Avatar
          sx={{
            ...avatarStyles,
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            "&:hover": {
              boxShadow: (t) =>
                `0 0 0 3px ${alpha(t.palette.primary.main, 0.35)}`,
              transform: "scale(1.06)",
            },
          }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 1,
              minWidth: 248,
              borderRadius: 2,
              overflow: "hidden",
              transformOrigin: "top right",
              animation: "userMenuEnter 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              "@keyframes userMenuEnter": {
                from: {
                  opacity: 0,
                  transform: "scale(0.94) translateY(-6px)",
                },
                to: {
                  opacity: 1,
                  transform: "scale(1) translateY(0)",
                },
              },
              boxShadow: (t) =>
                t.palette.mode === "dark"
                  ? "0 8px 24px rgba(0,0,0,0.5)"
                  : "0 8px 24px rgba(0,0,0,0.12)",
              "& .MuiMenuItem-root": {
                borderRadius: 1,
                mx: 0.75,
                px: 1.25,
                "&:hover": {
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                },
              },
            },
          },
        }}
      >
        {/* ── Header: información del usuario (no clickeable) ── */}
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pointerEvents: "none",
          }}
        >
          <Avatar
            sx={{
              ...avatarStyles,
              width: 44,
              height: 44,
              fontSize: "1.05rem",
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              noWrap
              sx={{ lineHeight: 1.3 }}
            >
              {fullName || "Usuario"}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ display: "block" }}
            >
              {user?.email ?? ""}
            </Typography>
            {activeProfile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.4,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: "text.disabled", fontSize: "0.7rem" }}
                >
                  {activeProfile.nombre}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 0.75 }} />

        {/* ── Acciones ── */}
        <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>

        {/* ── Cambiar perfil: toggle de la lista inline ── */}
        <MenuItem
          onClick={() => setProfilesOpen((prev) => !prev)}
          sx={{ py: 1 }}
        >
          <ListItemIcon>
            <ManageAccountsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cambiar perfil</ListItemText>
          <ExpandMoreIcon
            fontSize="small"
            sx={{
              ml: "auto",
              color: "text.secondary",
              transition: "transform 0.2s ease",
              transform: profilesOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </MenuItem>

        {/* ── Lista de perfiles (Collapse inline) ── */}
        <Collapse in={profilesOpen} timeout={160} unmountOnExit>
          <Box
            sx={{
              mx: 0.75,
              mb: 0.5,
              borderRadius: 1.5,
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? alpha(t.palette.common.white, 0.04)
                  : alpha(t.palette.common.black, 0.03),
              overflow: "hidden",
            }}
          >
            {allProfiles.map((perfil) => {
              const isActive = perfil.id === activeProfile?.id;
              return (
                <MenuItem
                  key={perfil.id}
                  onClick={() => handleSelectPerfil(perfil)}
                  sx={{
                    py: 0.85,
                    pl: 1.5,
                    mx: "0 !important",
                    borderRadius: "0 !important",
                    bgcolor: "transparent !important",
                    "&:hover": {
                      bgcolor: (t) =>
                        `${alpha(t.palette.primary.main, 0.1)} !important`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    {isActive ? (
                      <CheckIcon
                        fontSize="small"
                        sx={{ color: "primary.main" }}
                      />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={perfil.nombre}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "primary.main" : "text.primary",
                        noWrap: true,
                      },
                    }}
                  />
                </MenuItem>
              );
            })}
          </Box>
        </Collapse>

        <Divider sx={{ my: 0.75 }} />

        <MenuItem
          onClick={() => {
            handleMenuClose();
            logout();
          }}
          sx={{
            py: 1,
            mb: 0.5,
            color: "error.main",
            "& .MuiListItemIcon-root": { color: "error.main" },
            "&:hover": {
              bgcolor: (t) => alpha(t.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};