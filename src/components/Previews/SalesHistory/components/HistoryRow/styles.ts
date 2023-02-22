import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const historyRowStyles = makeStyles(theme =>
  createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 4,
      background: alpha('#000', 0.15),
      marginTop: 4,
      minHeight: 42,
      padding: theme.spacing(0.5, 0)
    }
  })
);
