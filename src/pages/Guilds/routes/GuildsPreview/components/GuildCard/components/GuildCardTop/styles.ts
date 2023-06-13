import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildCardTopStyles = makeStyles((theme) =>
  createStyles({
    guildCardTop: {
      display: 'flex',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: theme.spacing(1),
        right: theme.spacing(1),
        height: 1,
        backgroundColor: alpha(theme.palette.common.white, 0.06)
      }
    }
  })
);
