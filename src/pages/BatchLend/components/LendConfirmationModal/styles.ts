import { lighten } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    lendModalContainer: {
      width: 720,
      padding: theme.spacing(3, 2)
    },
    lendModalHeader: {
      textAlign: 'center',
      margin: 0
    },
    lendModalBody: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${lighten(theme.palette.common.black, 0.25)}`,
      color: '#00FFFF',
      margin: theme.spacing(3, 'auto'),
      padding: theme.spacing(2),
      textAlign: 'center',
      lineHeight: 1.7
    },
    lendModalFooter: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4)
    },
    lendModalButton: {
      margin: theme.spacing(0, 1),
      width: 160
    },
    gotchiNamesColumns: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px'
    }
  })
);
