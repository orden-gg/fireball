import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItem: 'center',
      gap: 8,
      margin: '8px 0'
    },
    channelingIcon: {
      position: 'relative',
      background: alpha('#000', 0.1),
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      minWidth: 28,
      '& img': {
        display: 'block'
      }
    },
    channelingStatus: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      '& span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        borderRadius: 4,
        background: alpha('#000', 0.2),
        minHeight: 28
      }
    },
    channelingStatusEnabled: {
      color: theme.palette.success.light
    },
    channelingStatusDisabled: {
      color: theme.palette.warning.light
    },
    activeIcon: {
      width: 28,
      height: 28,
      padding: 4,
      borderRadius: 4,
      background: alpha('#000', 0.2)
    },
    unactiveIcon: {
      filter: 'grayscale(1)'
    },
    tooltipRow: {
      display: 'flex',
      '& span': {
        marginRight: 8
      }
    },
    placeholder: {
      width: 28,
      height: 28,
      borderRadius: 4
    }
  })
);
