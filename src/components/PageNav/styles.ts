import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
      margin: 'auto'
    },
    navItem: {
      margin: 4,
      position: 'relative'
    },
    subNav: {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex'
    },
    button: {
      paddingRight: 12,
      paddingLeft: 12,
      color: '#fff',
      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      },
      '&.Mui-disabled': {
        backgroundColor: alpha(theme.palette.secondary.dark, 0.2),
        borderColor: alpha(theme.palette.secondary.light, 0.2),
        color: alpha('#fff', 0.3)
      },
      '&.active, &.active:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        '&.Mui-disabled': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: alpha('#fff', 0.2)
        }
      }
    },
    onlyIconBtn: {
      minWidth: 24,
      padding: 6,
      '& > .MuiButton-startIcon': {
        margin: 0
      }
    },
    subButton: {
      padding: '4px',
      lineHeight: 1.2,
      textTransform: 'lowercase'
    },
    navName: {
      marginRight: 8,
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.palette.primary.main,
      '.Mui-disabled &': {
        opacity: 0.4
      },
      '.active &, .active:hover &': {
        color: theme.palette.secondary.main
      },
      'Mui-disabled.active &, Mui-disabled.active:hover &': {
        color: theme.palette.primary.main
      }
    },
    buttonLoader: {
      width: 28,
      height: 14
    }
  })
);
