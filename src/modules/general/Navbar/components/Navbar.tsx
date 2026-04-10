import { Box } from "@mui/material";
import { StyledAppBar, StyledToolbar } from "../styles/navbar.styles";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarActions } from "./NavbarActions";

interface NavbarProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export const Navbar = ({ searchPlaceholder, onSearch }: NavbarProps) => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <NavbarLogo />

        <Box sx={{ ml: { xs: 5, sm: 10, md: 14 }, flex: 1 }}>
          <NavbarSearch placeholder={searchPlaceholder} onSearch={onSearch} />
        </Box>

        <NavbarActions />
      </StyledToolbar>
    </StyledAppBar>
  );
};