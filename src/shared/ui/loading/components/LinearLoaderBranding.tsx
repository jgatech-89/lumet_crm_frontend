import { Box } from "@mui/material";
import logoLumet from "@/assets/logo-lumet.png";
import {
  linearLoaderBrandingLogoSx,
  linearLoaderBrandingRingOrbitSx,
  linearLoaderBrandingRingPulseSx,
  linearLoaderBrandingRingSpinSx,
  linearLoaderBrandingRootSx,
} from "../styles/linearLoaderBranding.styles";

export function LinearLoaderBranding() {
  return (
    <Box sx={linearLoaderBrandingRootSx}>
      <Box sx={linearLoaderBrandingRingPulseSx} />
      <Box sx={linearLoaderBrandingRingOrbitSx} />
      <Box sx={linearLoaderBrandingRingSpinSx} />
      <Box component="img" src={logoLumet} alt="" aria-hidden sx={linearLoaderBrandingLogoSx} />
    </Box>
  );
}
