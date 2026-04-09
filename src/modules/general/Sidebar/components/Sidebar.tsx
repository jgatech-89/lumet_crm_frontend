import { Box, List, CircularProgress, Typography } from "@mui/material";
import { useSidebar } from "../Hooks/useSidebar";
import { SidebarItem } from "./SidebarItem";
import { sidebarStyles } from "../styles/sidebar.styles";

export const Sidebar = () => {
  const { items, loading } = useSidebar();

  return (
    <Box sx={sidebarStyles.container}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : items.length > 0 ? (
        <List sx={{ flex: 1 }}>
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ color: "#616161", p: 2 }}>
          No hay elementos
        </Typography>
      )}
    </Box>
  );
};