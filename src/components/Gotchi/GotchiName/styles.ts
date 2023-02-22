import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    gotchiNameBox: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
      color: theme.palette.text.primary,
      fontWeight: 500,
      position: 'relative',
      transition: 'all .2s ease-in-out',
      fontSize: 15,
      '.narrowed &': {
        background: 'none'
      }
    },
    gotchiName: {
      padding: '7px',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      margin: 0,
      '.narrowed &': {
        fontSize: 14
      }
    },
    gotchiId: {
      color: '#00FFFF',
      padding: '7px',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '25%',
        bottom: '25%',
        width: 1,
        backgroundColor: alpha(theme.palette.common.white, 0.15)
      }
    },
    callMadeIcon: {
      position: 'absolute',
      right: 2,
      bottom: 2,
      fontSize: 12,
      '.narrowed &': {
        bottom: 8
      }
    }
  })
);
