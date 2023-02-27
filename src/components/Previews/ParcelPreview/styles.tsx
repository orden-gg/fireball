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
    content: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'stretch'
      }
    },
    contentTop: {
      textAlign: 'center',
      marginBottom: 12,
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left',
        justifyContent: 'space-between',
        '& div': {
          marginTop: 3
        }
      }
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 12,
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
        marginRight: 20
      }
    },
    badges: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
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
    name: {
      fontWeight: 500,
      fontSize: 24,
      margin: '0 0 4px',
      textTransform: 'capitalize',
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
        marginRight: 8
      }
    },
    survey: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      fontSize: 14,
      '& > span': {
        fontSize: 14
      }
    },
    sales: {
      textAlign: 'center',
      marginTop: 12
    },
    salesTitle: {
      fontWeight: 500,
      fontSize: 20,
      margin: theme.spacing(1.5, 0, 1),
      textAlign: 'center'
    },
    boosts: {
      display: 'flex',
      justifyContent: 'center',
      '& + $installations': {
        marginTop: 4
      },
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
      }
    },
    boost: {
      borderRadius: 4,
      padding: 4,
      border: '2px solid transparent',
      marginRight: 8,
      textShadow: '1px 1px 0 black',
      textAlign: 'center',
      minWidth: 80,
      '& h5': {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 1,
        margin: 0
      },
      '& p': {
        fontSize: 10,
        margin: 0,
        color: '#fff',
        opacity: 0.5
      },
      '&.fud': {
        background: alpha(theme.palette.alchemica.fud, 0.1),
        color: theme.palette.alchemica.fud
      },
      '&.fomo': {
        background: alpha(theme.palette.alchemica.fomo, 0.1),
        color: theme.palette.alchemica.fomo
      },
      '&.alpha': {
        background: alpha(theme.palette.alchemica.alpha, 0.1),
        color: theme.palette.alchemica.alpha
      },
      '&.kek': {
        background: alpha(theme.palette.alchemica.kek, 0.1),
        color: theme.palette.alchemica.kek
      }
    },
    listing: {
      textAlign: 'right',
      marginTop: 12
    },
    installations: {
      width: '100%'
    }
  })
);
