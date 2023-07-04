import { createStyles, makeStyles } from '@mui/styles';

export const guildContentStyles = makeStyles((theme) =>
  createStyles({
    guildGotchis: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        height: '80vh',
        padding: theme.spacing(0, 2)
      }
    }
  })
);
