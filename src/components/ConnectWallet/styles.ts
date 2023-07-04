import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const connectWalletStyles = makeStyles((theme) =>
  createStyles({
    connectContent: {
      width: 920,
      minHeight: 400,
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      boxShadow: `0 0 10px 10px ${alpha(theme.palette.background.secondary, 0.5)}`,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(6),
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: theme.spacing('auto', 2)
      }
    },
    connectTitle: {
      textAlign: 'center',
      marginBottom: theme.spacing(5)
    },
    button: {
      width: 300,
      marginTop: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      fontSize: 24
    },
    progress: {
      marginLeft: theme.spacing(1)
    }
  })
);
