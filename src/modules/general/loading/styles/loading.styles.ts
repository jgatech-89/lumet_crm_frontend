export const linearLoaderProgressSx = {
  height: 6,
  borderRadius: 999,
  bgcolor: 'rgba(30, 136, 229, 0.15)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
  },
} as const;

export const fullPageLoaderContainerSx = {
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 2,
  bgcolor: 'background.default',
} as const;

export const skeletonRowSx = {
  borderRadius: 2,
} as const;
