import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      padding: theme.spacing(2, 1)
    },
    modal: {
      outline: 'none',
      margin: 'auto 0',
      position: 'relative',
      backgroundColor: theme.palette.background.secondary,
      border: `3px solid ${alpha('#000', 0.5)}`
    },
    close: {
      cursor: 'pointer',
      position: 'absolute',
      right: -20,
      top: -15,
      borderRadius: 20,
      backgroundColor: theme.palette.background.secondary,
      boxShadow: `inset 0 0 0 2px ${alpha('#000', 0.5)}`,
      '&:hover': {
        backgroundColor: theme.palette.background.default
      }
    }
  })
);
