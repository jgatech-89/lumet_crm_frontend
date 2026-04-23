import { memo } from "react";
import { NavLink } from "react-router-dom";
import { ListItemButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { RenderIcon } from "../../../../shared/icons/RenderIcon";
import { sidebarStyles } from "../styles/sidebar.styles";
import type { SidebarModuleItem } from "../types/sidebar.types";

interface Props {
  item: SidebarModuleItem;
  compact?: boolean;
}

export const SidebarItem = memo(function SidebarItem({ item, compact = false }: Props) {
  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
      disableGutters
      disableRipple
      sx={(theme) => sidebarStyles.item(theme, compact)}
    >
      <Box component="span" sx={compact ? sidebarStyles.compactItemInner : sidebarStyles.itemInner}>
        <Box component="span" sx={sidebarStyles.itemIcon}>
          <RenderIcon icon={item.icono} fontSize="small" />
        </Box>
        <Typography
          component="span"
          noWrap={!compact}
          sx={compact ? sidebarStyles.compactItemLabel : (theme) => sidebarStyles.itemLabel(theme)}
        >
          {item.nombre}
        </Typography>
      </Box>
    </ListItemButton>
  );
});
