import { Typography } from "@mui/material";
import { FooterContainer } from "../styles/footer.styles";

const FOOTER_COPYRIGHT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">
        © {FOOTER_COPYRIGHT_YEAR} Powered by JgaTech
      </Typography>
    </FooterContainer>
  );
};