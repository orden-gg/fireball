import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    guildWearables: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    guildWearable: {
      width: 24,
      height: 24,
      margin: theme.spacing(0, 1, 0.5, 0),
      background: alpha('#000', 0.15),
      borderRadius: 2
    }
    // divider: {
    //   width: '100%',
    //   marginBottom: theme.spacing(1),
    //   opacity: 0.5
    // }
  })
);
