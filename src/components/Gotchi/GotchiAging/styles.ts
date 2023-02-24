import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    container: {
      margin: theme.spacing(1, 0),
      display: 'flex',
      justifyContent: 'flex-start'
    },
    inner: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: alpha('#000', 0.3),
      padding: '4px 8px',
      borderRadius: 4,
      fontSize: 13,
      '& img': {
        width: 48,
        height: 48,
        marginRight: 8
      }
    },
    name: {
      display: 'flex',
      alignItems: 'center'
    },
    offset: {
      marginLeft: 8
    },
    highlight: {
      color: theme.palette.primary.main
    },
    placeholder: {
      borderRadius: 4
    }
  })
);
