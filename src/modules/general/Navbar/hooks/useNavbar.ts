import { useState } from "react";

export const useNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    isMenuOpen: Boolean(anchorEl),
  };
};