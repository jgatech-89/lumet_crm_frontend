import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'colorHex',
})<{ colorHex?: string }>(({ colorHex, variant }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 20px',
  boxShadow: 'none',
  transition:
    'background-color 70ms ease, color 70ms ease, border-color 70ms ease, box-shadow 70ms ease, filter 70ms ease',

  ...(colorHex &&
    variant === 'contained' && {
      backgroundColor: colorHex,
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: colorHex,
        filter: 'brightness(0.9)',
        boxShadow: `0px 4px 12px ${alpha(colorHex, 0.3)}`,
      },
      '&.Mui-disabled': {
        color: '#FFFFFF',
        backgroundColor: alpha(colorHex, 0.55),
      },
    }),

  ...(colorHex &&
    variant === 'outlined' && {
      borderColor: colorHex,
      color: colorHex,
      '&:hover': {
        borderColor: colorHex,
        backgroundColor: alpha(colorHex, 0.06),
      },
    }),

  ...(colorHex &&
    variant === 'text' && {
      color: colorHex,
      '&:hover': {
        backgroundColor: alpha(colorHex, 0.08),
      },
    }),
}));