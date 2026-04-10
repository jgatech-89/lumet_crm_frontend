import { styled } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
  color: theme.palette.mode === "dark" ? "#212b36" : "#333",
  boxShadow: theme.palette.mode === "dark"
    ? "0px 2px 8px rgba(0,0,0,0.3)"
    : "0px 2px 8px rgba(0,0,0,0.05)",
}));

export const StyledToolbar = styled(Toolbar)(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    minHeight: theme.spacing(7), // 56px en xs
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(8), // 64px en sm y arriba
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);