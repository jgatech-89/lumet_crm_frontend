import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { isValidElement } from 'react';

import { StyledDialog } from '../styles/CustomModal.styles';
import {
  modalDialogContentLinearLoadingSx,
  modalLinearLoaderActionTopWrapSx,
  modalLinearLoaderContentBodySx,
  modalLinearLoaderOverlayInnerSx,
  modalLinearLoaderOverlayOuterSx,
} from '../styles/modalContentLoading.styles';
import { CustomModalProps } from '../types/CustomModal.types';
import { AppSkeleton, LinearLoader } from '@/shared/ui/loading';
import { linearLoaderInModalNarrowSx } from '@/shared/ui/loading/styles/linearLoader.styles';

type PaperSlotProp = NonNullable<NonNullable<CustomModalProps['slotProps']>['paper']>;
type PaperOwnerState = PaperSlotProp extends (ownerState: infer T) => unknown ? T : never;

const renderTitleNode = (value: CustomModalProps['title']) => {
  if (isValidElement(value)) {
    return value;
  }

  return (
    <Typography
      variant="h5"
      fontWeight={600}
      sx={{ fontSize: { xs: '1.14rem', sm: '1.3rem' }, lineHeight: 1.22, letterSpacing: '-0.01em' }}
    >
      {value}
    </Typography>
  );
};

const renderSubtitleNode = (value: CustomModalProps['subtitle']) => {
  if (isValidElement(value)) {
    return value;
  }

  return (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.45, fontSize: '0.88rem' }}>
      {value}
    </Typography>
  );
};

const defaultDialogActionsSx: SxProps<Theme> = {
  px: 3,
  pb: 2.5,
  pt: 1.5,
  gap: 1.5,
  justifyContent: 'flex-end',
};

export const CustomModal = ({
  open,
  onClose,
  title,
  subtitle,
  headerIcon,
  actions,
  children,
  maxWidth = 'md',
  fullWidth = true,
  useMobileSheet = true,
  actionLoading = false,
  actionLoadingLabel = 'Procesando...',
  actionLoadingMode = 'overlay',
  contentLoading = false,
  contentLoadingVariant = 'skeleton',
  contentLoadingLabel = 'Cargando contenido...',
  contentSkeletonRows = 5,
  visualVariant = 'modern',
  showCloseButton = true,
  disableBackdropClose = false,
  contentSx,
  actionsSx,
  bottomBorderColor,
  ...dialogProps
}: CustomModalProps) => {
  const theme = useTheme();
  const resolvedBottomBorderColor = bottomBorderColor ?? theme.palette.primary.main;
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDialogClose = (_: unknown, reason: string) => {
    if (disableBackdropClose && reason === 'backdropClick') return;
    onClose();
  };

  const shouldRenderHeader =
    title || subtitle || headerIcon || showCloseButton;

  const paperSlotProps = dialogProps.slotProps?.paper;
  const buildPaperSx = (paperSx: unknown) => {
    const visualVariantSx =
      visualVariant === 'modern'
        ? {
            borderRadius: '20px',
          }
        : {};

    const mobilePaperSx = useMobileSheet
      ? {
          '@media (max-width:600px)': {
            margin: '0px !important',
            width: '100% !important',
            maxWidth: '100% !important',
            minWidth: '100% !important',
            borderRadius: '20px 20px 0 0',
            height: 'auto',
            minHeight: '70dvh',
            maxHeight: '90dvh',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          },
        }
      : undefined;

    return [
      {
        borderBottom: `4px solid ${resolvedBottomBorderColor}`,
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '4px',
          backgroundColor: resolvedBottomBorderColor,
          pointerEvents: 'none',
        },
      },
      visualVariantSx,
      ...(mobilePaperSx ? [mobilePaperSx] : []),
      ...(Array.isArray(paperSx)
        ? paperSx
        : paperSx
          ? [paperSx]
          : []),
    ];
  };

  const mergedPaperSlotProps =
    typeof paperSlotProps === 'function'
      ? (ownerState: PaperOwnerState) => {
          const resolvedPaperProps = paperSlotProps(ownerState) as { sx?: unknown };

          return {
            ...resolvedPaperProps,
            sx: buildPaperSx(resolvedPaperProps?.sx),
          };
        }
      : {
          ...(paperSlotProps as { sx?: unknown } | undefined),
          sx: buildPaperSx((paperSlotProps as { sx?: unknown } | undefined)?.sx),
        };

  const transitionSlotProps = dialogProps.slotProps?.transition;
  const mergedTransitionSlotProps =
    typeof transitionSlotProps === 'function'
      ? transitionSlotProps
      : {
          ...(transitionSlotProps as Record<string, unknown> | undefined),
          timeout: useMobileSheet && isMobileViewport
            ? { enter: 220, exit: 170 }
            : { enter: 200, exit: 150 },
          easing: {
            enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
            exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
        };

  const mobileSheetSx = useMobileSheet
    ? {
        '@media (max-width:600px)': {
          overflow: 'hidden',
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(8px)',
            backgroundColor: alpha(theme.palette.background.default, theme.palette.mode === "dark" ? 0.72 : 0.56),
          },
          '& .MuiDialog-container': {
            alignItems: 'flex-end',
            padding: 0,
            overflow: 'hidden',
          },
          '& .MuiPaper-root': {
            overflowX: 'hidden',
            overflowY: 'hidden',
            display: 'grid',
            gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
          },
          '& .MuiDialogTitle-root, & .MuiDialogActions-root': {
            flex: '0 0 auto',
          },
          '& .MuiDialogContent-root': {
            flex: '1 1 auto',
            minHeight: 0,
            paddingTop: '16px',
            paddingBottom: '20px',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          },
          '& .MuiDialogActions-root': {
            width: '100%',
            boxSizing: 'border-box',
            gap: '10px',
            paddingTop: '8px',
            paddingBottom: '20px',
            overflowX: 'hidden',
            overflowY: 'hidden',
            flexWrap: 'nowrap',
            '& > :not(style) + :not(style)': {
              marginLeft: 0,
            },
            '& > *': {
              flex: '1 1 0',
              minWidth: 0,
              maxWidth: '100%',
            },
          },
        },
      }
    : undefined;

  const mergedDialogSx = [
    {
      '& .MuiBackdrop-root': {
        backgroundColor: alpha(theme.palette.background.default, theme.palette.mode === "dark" ? 0.72 : 0.56),
      },
    },
    ...(mobileSheetSx ? [mobileSheetSx] : []),
    ...(Array.isArray(dialogProps.sx)
      ? dialogProps.sx
      : dialogProps.sx
        ? [dialogProps.sx]
        : []),
  ];

  return (
    <StyledDialog
      open={open}
      onClose={handleDialogClose}
      scroll="paper"
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={mergedDialogSx}
      {...dialogProps}
      slotProps={{
        ...dialogProps.slotProps,
        paper: mergedPaperSlotProps,
        transition: mergedTransitionSlotProps,
      }}
    >
      {useMobileSheet && (
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'center',
            pt: 1.25,
            pb: 0.25,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 5,
              borderRadius: 999,
              bgcolor: (theme) => alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.32 : 0.2),
            }}
          />
        </Box>
      )}

      {shouldRenderHeader && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            p: 2.5,
            pb: { xs: useMobileSheet ? 0.5 : 0, sm: 0 },
            pt: { xs: useMobileSheet ? 2.35 : 2.5, sm: 2.5 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {headerIcon}

            {(title || subtitle) && (
              <Box>
                {title && (
                  renderTitleNode(title)
                )}
                {subtitle && (
                  renderSubtitleNode(subtitle)
                )}
              </Box>
            )}
          </Box>

          {showCloseButton && (
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={[
          {
            '& > * + *': {
              mt: 1.25,
            },
          },
          contentLoading && contentLoadingVariant === 'linear' ? modalDialogContentLinearLoadingSx : {},
          ...(contentSx ? (Array.isArray(contentSx) ? contentSx : [contentSx]) : []),
        ]}
      >
        {actionLoading && actionLoadingMode === 'top' ? (
          <Box sx={modalLinearLoaderActionTopWrapSx}>
            <LinearLoader label={actionLoadingLabel} sx={linearLoaderInModalNarrowSx} />
          </Box>
        ) : null}

        {contentLoading ? (
          contentLoadingVariant === 'linear' ? (
            <Box sx={modalLinearLoaderContentBodySx}>
              <LinearLoader label={contentLoadingLabel} sx={linearLoaderInModalNarrowSx} />
            </Box>
          ) : (
            <AppSkeleton rows={contentSkeletonRows} showHeader={false} />
          )
        ) : (
          children
        )}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={[
            defaultDialogActionsSx,
            ...(actionsSx ? (Array.isArray(actionsSx) ? actionsSx : [actionsSx]) : []),
          ]}
        >
          {actions}
        </DialogActions>
      )}

      {actionLoading && actionLoadingMode === 'overlay' ? (
        <Box sx={modalLinearLoaderOverlayOuterSx}>
          <Box sx={modalLinearLoaderOverlayInnerSx}>
            <LinearLoader label={actionLoadingLabel} sx={linearLoaderInModalNarrowSx} />
          </Box>
        </Box>
      ) : null}
    </StyledDialog>
  );
};