import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildWearblesStyles = makeStyles((theme) =>
  createStyles({
    guildWearables: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: theme.spacing(2, 0)
    },
    guildWearable: {
      width: 28,
      height: 28,
      margin: theme.spacing(0, 1, 0.5, 0),
      background: alpha('#000', 0.15),
      borderRadius: 2,
      minHeight: 'auto',
      position: 'relative',
      '& img': {
        maxHeight: '80%',
        width: '80%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  })
);
