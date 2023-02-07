import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    whitelist: {
      backgroundColor: alpha('#000', 0.3),
      margin: theme.spacing(0.5, 0.5, 0.5, 'auto'),
      borderRadius: 2,
      padding: '2px 4px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center'
    }
  })
);
