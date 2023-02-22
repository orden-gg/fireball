import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      overflowX: 'auto',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
      }
    },
    installation: {
      flexShrink: 0,
      position: 'relative',
      margin: '0 1px'
    },
    installationImage: {
      '$installation &': {
        height: '100%',
        width: '100%',
        background: alpha('#000', 0.2),
        margin: 0
      }
    },
    installationQantity: {
      padding: '0 2px',
      position: 'absolute',
      bottom: 2,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 10,
      fontWeight: 700,
      borderRadius: 2,
      lineHeight: 1,
      background: theme.palette.secondary.dark,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1
    },
    row: {
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    upgrade: {
      flexBasis: '100% !important',
      display: 'flex',
      justifyContent: 'space-between'
    },
    placeholder: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4px 0',
      padding: '0 4px'
    },
    placeholderInner: {
      borderRadius: 4
    },
    placeholderWarning: {
      color: 'orange',
      width: '100%'
    },
    subtitle: {
      color: 'deeppink'
    },
    ready: {
      color: 'lime'
    },
    inner: {
      '& span': {
        color: 'yellow'
      },
      '& + $inner': {
        marginLeft: 8
      }
    },
    countdown: {
      color: 'orange'
    }
  })
);
