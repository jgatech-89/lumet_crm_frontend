import { Box, Typography } from "@mui/material";
import logoIcon from "@/assets/logo-lumet.png";

export function Logo({ size = "medium" }: { size?: "small" | "medium" }) {
  const isSmall = size === "small";
  const fontSize = isSmall ? 20 : 24;
  const iconHeight = Math.round(fontSize * 2.35);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        component="img"
        src={logoIcon}
        alt=""
        sx={{
          height: iconHeight,
          maxHeight: 60,
          width: "auto",
          flexShrink: 0,
          display: "block",
          objectFit: "contain",
        }}
        aria-hidden
      />
      <Typography
        component="span"
        sx={{
          fontSize,
          fontWeight: 700,
          color: "text.primary",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Lumet.pro
      </Typography>
    </Box>
  );
}
