import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    gotchiIdentity: {
      position: 'absolute',
      right: 0,
      top: 5,
      zIndex: 1,
      backgroundColor: alpha('#000', 0.5),
      padding: theme.spacing(0, 0.5),
      lineHeight: 1.3,
      fontSize: 13
    }
  })
);
