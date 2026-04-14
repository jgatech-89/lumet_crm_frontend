import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5, 0),
  textAlign: "center",
  backgroundColor: "transparent",
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
}));