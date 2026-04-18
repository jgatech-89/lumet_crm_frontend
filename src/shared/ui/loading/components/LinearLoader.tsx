import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { linearLoaderProgressSx, fullPageLoaderContainerSx } from '../styles/loading.styles';
import type { LinearLoaderProps } from '../types/LinearLoader.types';

export function LinearLoader({
  label = 'Cargando...',
  showLabel = true,
  fullPage = false,
  sx,
}: LinearLoaderProps) {
  if (fullPage) {
    return (
      <Box sx={[fullPageLoaderContainerSx, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}>
        <Stack spacing={1.25} sx={{ width: 'min(460px, 100%)' }}>
          {showLabel ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
          ) : null}
          <LinearProgress
            aria-label={label}
            sx={linearLoaderProgressSx}
          />
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={[{ width: '100%' }, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}>
      {showLabel ? (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      ) : null}
      <LinearProgress
        aria-label={label}
        sx={linearLoaderProgressSx}
      />
    </Stack>
  );
}