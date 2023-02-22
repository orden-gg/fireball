import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    gotchiLvl: {
      display: 'inline-flex',
      position: 'relative',
      backgroundColor: alpha('#000', 0.2),
      borderRadius: '50%',

      '.vertical &': {
        margin: '0 2px'
      }
    },
    gotchiLvlNumber: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      inset: 0,
      fontSize: 13,
      fontWeight: 500
    },
    gotchiLvlProggress: {
      color: '#FF1CFF'
    }
  })
);
