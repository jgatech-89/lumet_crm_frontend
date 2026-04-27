import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { fullPageLoaderContainerSx } from "../styles/loading.styles";
import {
  linearLoaderFullPageStackSx,
  linearLoaderLabelSx,
  linearLoaderProgressFullRowSx,
  linearLoaderStackSx,
} from "../styles/linearLoader.styles";
import type { LinearLoaderProps } from "../types/LinearLoader.types";
import { LinearLoaderBranding } from "./LinearLoaderBranding";

export function LinearLoader({
  label = "Cargando...",
  showLabel = true,
  fullPage = false,
  showBranding = true,
  sx,
}: LinearLoaderProps) {
  const sxArray = sx ? (Array.isArray(sx) ? sx : [sx]) : [];

  if (fullPage) {
    return (
      <Box sx={[fullPageLoaderContainerSx, ...sxArray]}>
        <Stack spacing={1.25} sx={linearLoaderFullPageStackSx}>
          {showBranding ? <LinearLoaderBranding /> : null}
          {showLabel ? (
            <Typography variant="body2" color="text.secondary" sx={linearLoaderLabelSx}>
              {label}
            </Typography>
          ) : null}
          <LinearProgress aria-label={label} sx={linearLoaderProgressFullRowSx} />
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={1.25} sx={[linearLoaderStackSx, ...sxArray]}>
      {showBranding ? <LinearLoaderBranding /> : null}
      {showLabel ? (
        <Typography variant="body2" color="text.secondary" sx={linearLoaderLabelSx}>
          {label}
        </Typography>
      ) : null}
      <LinearProgress aria-label={label} sx={linearLoaderProgressFullRowSx} />
    </Stack>
  );
}
