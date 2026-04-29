import { alpha } from "@mui/material/styles";

export const linearLoaderProgressSx = {
  height: 6,
  borderRadius: 999,
  bgcolor: (theme: { palette: { mode: string; primary: { main: string } } }) =>
    alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.3 : 0.15),
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

export const skeletonToneSx = {
  "& .MuiSkeleton-root": {
    bgcolor: (theme: { palette: { mode: string; text: { primary: string } } }) =>
      alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.24 : 0.1),
  },
} as const;