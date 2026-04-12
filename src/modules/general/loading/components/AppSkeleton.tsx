import { Box, Skeleton, Stack } from '@mui/material';
import { skeletonRowSx } from '../styles/loading.styles';
import type { AppSkeletonProps } from '../types/AppSkeleton.types';

export function AppSkeleton({
  rows = 4,
  showHeader = true,
  showAvatar = false,
}: AppSkeletonProps) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {showHeader && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          {showAvatar ? <Skeleton variant="circular" width={40} height={40} /> : null}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="42%" height={34} />
            <Skeleton variant="text" width="65%" height={24} />
          </Box>
        </Stack>
      )}

      <Stack spacing={1.25}>
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton
            key={`app-skeleton-row-${index}`}
            variant="rounded"
            width="100%"
            height={46}
            sx={skeletonRowSx}
          />
        ))}
      </Stack>
    </Stack>
  );
}
