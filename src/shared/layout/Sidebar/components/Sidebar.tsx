import { Box, List, CircularProgress, Typography } from "@mui/material";
import { useSidebar } from "../hooks/useSidebar";
import { SidebarItem } from "./SidebarItem";
import { sidebarStyles } from "../styles/sidebar.styles";
import { DURATION, EASING } from "@/core/theme/motion";

const loadingPlaceholderSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  py: 4,
} as const;

export const Sidebar = () => {
  const { items, loading } = useSidebar();

  return (
    <Box sx={sidebarStyles.container}>
      {loading ? (
        <Box sx={loadingPlaceholderSx}>
          <CircularProgress />
        </Box>
      ) : items.length > 0 ? (
        <Box
          component="nav"
          aria-label="Módulos"
          sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
        >
          <List
            disablePadding
            component="ul"
            sx={{
              ...sidebarStyles.navList,
              flex: 1,
            }}
          >
            {items.map((item, index) => (
              <Box
                key={item.id}
                component="li"
                sx={{
                  listStyle: "none",
                  animation: `fadeIn ${DURATION.normal} ${EASING.enter} both`,
                  animationDelay: `${index * 40}ms`,
                }}
              >
                <SidebarItem item={item} />
              </Box>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary", p: 2 }}>
          No hay elementos
        </Typography>
      )}
    </Box>
  );
};