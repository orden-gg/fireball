import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    container: {
      background: alpha('#000', 0.2),
      padding: 12,
      borderRadius: 4,
      maxWidth: 900,
      margin: 'auto'
    },
    inner: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'flex-start'
      }
    },
    description: {
      padding: 12
    },
    address: {
      textAlign: 'center',
      borderBottom: '2px solid #343740',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    name: {
      fontWeight: 500,
      fontSize: 24,
      textTransform: 'capitalize',
      margin: 0,
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
        marginRight: 15
      }
    },
    badge: {
      padding: '8px 12px',
      marginRight: 8,
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center'
    },
    highlighted: {
      color: theme.palette.primary.main,
      marginRight: 4
    },
    badges: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '8px',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
      }
    },
    gotchi: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
);
