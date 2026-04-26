import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '20px',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 20px 44px rgba(0, 0, 0, 0.52)'
        : '0 20px 44px rgba(15, 23, 42, 0.14)',
    border: `1px solid ${theme.palette.divider}`,
    padding: '0px',
    position: 'relative',
    maxHeight: 'calc(100dvh - 32px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  '& .MuiDialogTitle-root': {
    padding: '20px 24px 16px 24px',
  },
  '& .MuiDialogContent-root': {
    padding: '0px 24px 16px 24px',
    borderBottom: 'none',
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    '& .MuiTextField-root .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.28)' : '#d9e2ec',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.45)' : '#b7c5d8',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 1.5,
      },
      '&.Mui-focused': {
        boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.28)' : 'rgba(37,99,235,0.16)'}`,
      },
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,
      color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#334155',
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 1,
    },
    '& .MuiInputBase-inputMultiline': {
      minHeight: '78px !important',
    },
  },
  '& .MuiDialogActions-root': {
    padding: '12px 24px 20px 24px',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));