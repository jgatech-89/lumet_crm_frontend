import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '16px',
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.08)',
    padding: '0px',
    position: 'relative',
    maxHeight: 'calc(100dvh - 32px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  '& .MuiDialogContent-root': {
    padding: '20px 24px 12px 24px',
    borderBottom: 'none',
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  },
}));