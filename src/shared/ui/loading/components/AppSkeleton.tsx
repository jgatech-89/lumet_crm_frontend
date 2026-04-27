import { Box, Skeleton, Stack } from '@mui/material';
import { skeletonRowSx, skeletonToneSx } from '../styles/loading.styles';
import type { AppSkeletonProps } from '../types/AppSkeleton.types';

export function AppSkeleton({
  variant = 'list',
  rows = 4,
  showHeader = true,
  showAvatar = false,
  fullPage = false,
  showTopCards = true,
  tableRows = 4,
}: AppSkeletonProps) {
  if (variant === 'dashboard') {
    return (
      <Box
        sx={{
          minHeight: fullPage ? '100vh' : 'auto',
          p: fullPage ? { xs: 2, sm: 3 } : 0,
          bgcolor: fullPage ? 'background.default' : 'transparent',
          ...skeletonToneSx,
        }}
      >
        {fullPage ? <Skeleton variant="rounded" width={260} height={44} /> : null}

        <Box sx={{ mt: fullPage ? 3 : 0 }}>
          {showTopCards ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '2fr minmax(220px, 280px)' },
                gap: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 2, md: 2.5 },
                }}
              >
                <Skeleton width={130} height={18} />
                <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                  <Skeleton variant="rounded" width={88} height={30} />
                  <Skeleton variant="rounded" width={88} height={30} />
                  <Skeleton variant="rounded" width={92} height={30} />
                </Box>
                <Skeleton width={95} height={18} sx={{ mt: 2 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Skeleton variant="rounded" width={76} height={30} />
                  <Skeleton variant="rounded" width={82} height={30} />
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 2, md: 2.5 },
                  minHeight: 136,
                }}
              >
                <Skeleton width={110} height={18} />
                <Skeleton width={72} height={54} sx={{ mt: 0.5 }} />
                <Skeleton width={82} height={18} />
              </Box>
            </Box>
          ) : null}

          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'divider',
              p: 2,
            }}
          >
            <Skeleton width="100%" height={32} />
            {Array.from({ length: tableRows }).map((_, row) => (
              <Box
                key={`dashboard-skeleton-row-${row}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 1.1fr 0.7fr',
                  gap: 1.5,
                  mt: 1.5,
                }}
              >
                <Skeleton height={22} />
                <Skeleton height={22} />
                <Skeleton height={22} />
                <Skeleton height={22} />
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2.5 }}>
              <Skeleton width={170} height={20} />
              <Skeleton width={160} height={34} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: '100%', ...skeletonToneSx }}>
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