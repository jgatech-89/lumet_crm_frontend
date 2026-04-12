import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { isValidElement } from 'react';
import { AppSkeleton, LinearLoader } from '@/modules/general';
import { StyledDialog } from '../styles/CustomModal.styles';
import { CustomModalProps } from '../types/CustomModal.types';

type PaperSlotProp = NonNullable<NonNullable<CustomModalProps['slotProps']>['paper']>;
type PaperOwnerState = PaperSlotProp extends (ownerState: infer T) => unknown ? T : never;

const renderTitleNode = (value: CustomModalProps['title']) => {
  if (isValidElement(value)) {
    return value;
  }

  return (
    <Typography variant="h5" fontWeight={700}>
      {value}
    </Typography>
  );
};

const renderSubtitleNode = (value: CustomModalProps['subtitle']) => {
  if (isValidElement(value)) {
    return value;
  }

  return (
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  );
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
  showCloseButton = true,
  disableBackdropClose = false,
  contentSx,
  actionsSx,
  bottomBorderColor = '#1E88E5',
  ...dialogProps
}: CustomModalProps) => {
  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDialogClose = (_: unknown, reason: string) => {
    if (disableBackdropClose && reason === 'backdropClick') return;
    onClose();
  };

  const shouldRenderHeader =
    title || subtitle || headerIcon || showCloseButton;

  const paperSlotProps = dialogProps.slotProps?.paper;
  const buildPaperSx = (paperSx: unknown) => {
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
        borderBottom: `4px solid ${bottomBorderColor}`,
      },
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
            backgroundColor: 'rgba(15, 23, 42, 0.28)',
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
              bgcolor: '#CBD5E1',
            }}
          />
        </Box>
      )}

      {shouldRenderHeader && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            pb: { xs: useMobileSheet ? 0.5 : 0, sm: 0 },
            pt: { xs: useMobileSheet ? 2.25 : 2, sm: 2 },
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
            <IconButton onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent sx={contentSx}>
        {actionLoading && actionLoadingMode === 'top' ? (
          <LinearLoader label={actionLoadingLabel} sx={{ mb: 1.5 }} />
        ) : null}

        {contentLoading ? (
          contentLoadingVariant === 'linear' ? (
            <LinearLoader label={contentLoadingLabel} />
          ) : (
            <AppSkeleton rows={contentSkeletonRows} showHeader={false} />
          )
        ) : (
          children
        )}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ gap: 1, ...actionsSx }}>
          {actions}
        </DialogActions>
      )}

      {actionLoading && actionLoadingMode === 'overlay' ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, sm: 3 },
            bgcolor: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Box sx={{ width: 'min(460px, 100%)' }}>
            <LinearLoader label={actionLoadingLabel} />
          </Box>
        </Box>
      ) : null}
    </StyledDialog>
  );
};