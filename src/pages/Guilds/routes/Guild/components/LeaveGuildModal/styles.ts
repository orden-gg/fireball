import { lighten } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const leaveGuildModaStyles = makeStyles((theme) =>
  createStyles({
    leaveGuildModalContainer: {
      width: 720,
      padding: theme.spacing(3, 2)
    },
    leaveGuildModalHeader: {
      textAlign: 'center',
      margin: 0
    },
    leaveGuildModalBody: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${lighten(theme.palette.common.black, 0.25)}`,
      color: theme.palette.warning.light,
      maxWidth: 500,
      margin: theme.spacing(3, 'auto'),
      padding: theme.spacing(2),
      textAlign: 'center',
      lineHeight: 1.7
    },
    leaveGuildModalFooter: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4)
    },
    leaveGuildModalButton: {
      margin: theme.spacing(0, 1),
      width: 160
    }
  })
);
