import { alpha, styled } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";
import { transition } from "@/core/theme/motion";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.background.paper, 0.85),
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  color: theme.palette.text.primary,
  borderBottom: "none",
  transition: transition(["background-color", "box-shadow"], "slow"),
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 1px 0 ${alpha(theme.palette.common.white, 0.07)}, 0 4px 24px ${alpha(theme.palette.common.black, 0.45)}`
      : `0 1px 4px ${alpha(theme.palette.common.black, 0.06)}, 0 2px 8px ${alpha(theme.palette.common.black, 0.04)}`,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  minHeight: theme.spacing(7),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    minHeight: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
