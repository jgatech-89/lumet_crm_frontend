import { memo } from "react";
import { NavLink } from "react-router-dom";
import { ListItemButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { RenderIcon } from "../../../../shared/icons/RenderIcon";
import { sidebarStyles } from "../styles/sidebar.styles";
import type { SidebarModuleItem } from "../types/sidebar.types";

interface Props {
  item: SidebarModuleItem;
}

export const SidebarItem = memo(function SidebarItem({ item }: Props) {
  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
      disableGutters
      disableRipple
      sx={(theme) => sidebarStyles.item(theme)}
    >
      <Box component="span" sx={sidebarStyles.itemInner}>
        <Box component="span" sx={sidebarStyles.itemIcon}>
          <RenderIcon icon={item.icono} fontSize="small" />
        </Box>
        <Typography component="span" noWrap sx={(theme) => sidebarStyles.itemLabel(theme)}>
          {item.nombre}
        </Typography>
      </Box>
    </ListItemButton>
  );
});
