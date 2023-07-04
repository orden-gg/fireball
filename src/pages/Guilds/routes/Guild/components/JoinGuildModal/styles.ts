import { lighten } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const joinGuildModaStyles = makeStyles((theme) =>
  createStyles({
    joinGuildModalContainer: {
      width: 720,
      padding: theme.spacing(3, 2)
    },
    joinGuildModalHeader: {
      textAlign: 'center',
      margin: 0
    },
    joinGuildModalBody: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${lighten(theme.palette.common.black, 0.25)}`,
      color: theme.palette.warning.light,
      maxWidth: 500,
      margin: theme.spacing(3, 'auto'),
      padding: theme.spacing(2),
      textAlign: 'center',
      lineHeight: 1.7
    },
    joinGuildModalFooter: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4)
    },
    joinGuildModalButton: {
      margin: theme.spacing(0, 1),
      width: 160
    }
  })
);
