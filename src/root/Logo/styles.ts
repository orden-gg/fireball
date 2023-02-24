import { createStyles, makeStyles } from '@mui/styles';

// TODO check if needed, not used for now
export const styles = makeStyles((theme) =>
  createStyles({
    logoWrapper: {
      top: theme.spacing(1.5),
      left: theme.spacing(2),
      position: 'fixed',
      zIndex: theme.zIndex.appBar,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary,
      textDecoration: 'none',
      [theme.breakpoints.up('md')]: {
        paddingBottom: 10
      }
    },
    logoDesktop: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    logoMobile: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);
