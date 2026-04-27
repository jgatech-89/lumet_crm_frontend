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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { AuthUserRole } from "@/modules/auth/types/auth.types";
import { getStoredActiveRoleId, setStoredActiveRoleId } from "@/core/modules/activeRoleSession";
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

const avatarStyles = {
  bgcolor: "primary.main",
  color: "common.white",
  fontWeight: 600,
};

function resolveActiveRole(roles: AuthUserRole[]): AuthUserRole | null {
  if (!roles.length) return null;
  const storedId = getStoredActiveRoleId();
  if (storedId === undefined) return roles[0];
  return roles.find((role) => role.id === storedId) ?? roles[0];
}

export const NavbarActions = () => {
  const { anchorEl, handleMenuOpen, handleMenuClose, isMenuOpen } =
    useNavbar();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const userRoles = user?.roles ?? [];

  const [activeProfile, setActiveProfile] = useState<AuthUserRole | null>(
    resolveActiveRole(userRoles),
  );
  const [profilesOpen, setProfilesOpen] = useState(false);

  // Sincronizar perfil activo cuando cambian los roles del usuario.
  useEffect(() => {
    const resolved = resolveActiveRole(userRoles);
    setActiveProfile(resolved);
    setStoredActiveRoleId(resolved?.id);
  }, [userRoles]);

  // Cerrar la lista de perfiles al cerrar el menú principal
  useEffect(() => {
    if (!isMenuOpen) setProfilesOpen(false);
  }, [isMenuOpen]);

  const allProfiles: AuthUserRole[] = userRoles;

  const handleSelectPerfil = (perfil: AuthUserRole) => {
    setActiveProfile(perfil);
    setStoredActiveRoleId(perfil.id);
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
              minWidth: 360,
              borderRadius: 4,
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
                borderRadius: 1.5,
                mx: 1,
                px: 1.5,
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
            px: 2.25,
            pt: 2.25,
            pb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.75,
            pointerEvents: "none",
          }}
        >
          <Avatar
            sx={{
              ...avatarStyles,
              width: 44,
              height: 44,
              fontSize: "1.05rem",
              boxShadow: (t) => `0 10px 20px ${alpha(t.palette.primary.main, 0.25)}`,
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
                  gap: 0.7,
                  mt: 0.55,
                  px: 1.1,
                  py: 0.45,
                  borderRadius: 999,
                  bgcolor: (t) =>
                    t.palette.mode === "dark"
                      ? alpha(t.palette.success.main, 0.16)
                      : alpha(t.palette.success.main, 0.1),
                  border: "1px solid",
                  borderColor: (t) =>
                    t.palette.mode === "dark"
                      ? alpha(t.palette.success.main, 0.42)
                      : alpha(t.palette.success.main, 0.24),
                }}
              >
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: "success.main", fontSize: "0.72rem", fontWeight: 600 }}
                >
                  {activeProfile.nombre}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 0.75 }} />

        {/* ── Acciones ── */}
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.2 }}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Perfil"
            secondary="Ver y editar tu información"
            slotProps={{
              primary: { fontWeight: 600 },
              secondary: { fontSize: "0.8rem", color: "text.secondary" },
            }}
          />
          <ChevronRightIcon sx={{ color: "text.disabled" }} />
        </MenuItem>

        {/* ── Cambiar perfil: toggle de la lista inline ── */}
        <MenuItem
          onClick={() => setProfilesOpen((prev) => !prev)}
          sx={{ py: 1.2 }}
        >
          <ListItemIcon>
            <ManageAccountsOutlinedIcon
              fontSize="small"
              sx={{ color: profilesOpen ? "primary.main" : "text.secondary" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar perfil"
            slotProps={{ primary: { fontWeight: 600 } }}
          />
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
              mx: 1,
              mb: 0.75,
              borderRadius: 2,
              bgcolor: "transparent",
              overflow: "hidden",
            }}
          >
            {allProfiles.length ? (
              allProfiles.map((perfil) => {
                const isActive = perfil.id === activeProfile?.id;
                return (
                  <MenuItem
                    key={perfil.id}
                    onClick={() => handleSelectPerfil(perfil)}
                    sx={{
                      py: 1.05,
                      pl: 1.2,
                      mx: 0.7,
                      my: 0.35,
                      borderRadius: "10px !important",
                      bgcolor: isActive ? `${alpha("#2563eb", 0.1)} !important` : "transparent !important",
                      "&:hover": {
                        bgcolor: (t) =>
                          `${alpha(t.palette.primary.main, 0.1)} !important`,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      {isActive ? (
                        <CheckCircleIcon fontSize="small" sx={{ color: "primary.main" }} />
                      ) : (
                        <CheckCircleOutlineIcon fontSize="small" sx={{ color: "text.disabled" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={perfil.nombre}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "primary.main" : "text.primary",
                          noWrap: true,
                        },
                      }}
                    />
                  </MenuItem>
                );
              })
            ) : (
              <Box sx={{ px: 2, py: 1.2 }}>
                <Typography variant="body2" color="text.secondary">
                  No tienes perfiles asignados.
                </Typography>
              </Box>
            )}
          </Box>
        </Collapse>

        <Divider sx={{ my: 0.75 }} />

        <MenuItem
          onClick={() => {
            handleMenuClose();
            logout();
          }}
          sx={{
            py: 1.2,
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
          <ListItemText
            primary="Cerrar sesión"
            secondary="Salir del sistema"
            slotProps={{
              primary: { fontWeight: 600 },
              secondary: { fontSize: "0.8rem", color: "text.secondary" },
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};