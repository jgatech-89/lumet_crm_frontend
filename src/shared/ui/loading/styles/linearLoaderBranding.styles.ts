import type { SxProps, Theme } from "@mui/material/styles";
import { alpha, keyframes } from "@mui/material/styles";

export const linearLoaderBrandingSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const linearLoaderBrandingPulse = keyframes`
  0%, 100% {
    opacity: 0.35;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.12);
  }
`;

export const linearLoaderBrandingOrbit = keyframes`
  0% {
    opacity: 0.2;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.55;
  }
  100% {
    opacity: 0.2;
    transform: rotate(360deg);
  }
`;

export const linearLoaderBrandingRootSx: SxProps<Theme> = {
  position: "relative",
  width: 84,
  height: 84,
  mx: "auto",
  mb: 2,
  flexShrink: 0,
};

export const linearLoaderBrandingRingPulseSx: SxProps<Theme> = (theme) => ({
  position: "absolute",
  inset: -10,
  borderRadius: "50%",
  border: `2px solid ${alpha(theme.palette.primary.main, 0.22)}`,
  animation: `${linearLoaderBrandingPulse} 2s ease-in-out infinite`,
});

export const linearLoaderBrandingRingOrbitSx: SxProps<Theme> = (theme) => ({
  position: "absolute",
  inset: -4,
  borderRadius: "50%",
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.45)}`,
  animation: `${linearLoaderBrandingOrbit} 2.8s linear infinite`,
});

export const linearLoaderBrandingRingSpinSx: SxProps<Theme> = (theme) => ({
  position: "absolute",
  inset: 2,
  borderRadius: "50%",
  border: "3px solid",
  borderColor: alpha(theme.palette.divider, theme.palette.mode === "dark" ? 0.45 : 0.55),
  borderTopColor: "primary.main",
  borderRightColor: alpha(theme.palette.primary.main, 0.35),
  animation: `${linearLoaderBrandingSpin} 0.95s linear infinite`,
});

export const linearLoaderBrandingLogoSx: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 40,
  height: 40,
  objectFit: "contain",
  display: "block",
  pointerEvents: "none",
  filter: (theme) =>
    theme.palette.mode === "dark" ? "brightness(1.08) contrast(1.02)" : "none",
};
