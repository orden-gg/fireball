import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildFormStyles = makeStyles((theme) =>
  createStyles({
    formWrappper: {
      maxWidth: 1000,
      width: '100%',
      margin: 'auto',
      padding: theme.spacing(4, 0)
    },
    formContent: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(3, 2),
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      boxShadow: `0 0 10px 10px ${alpha(theme.palette.background.secondary, 0.5)}`,
      width: '100%'
    },
    formTitle: {
      textAlign: 'center'
    },
    formFooter: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center'
    },
    formSubmitButton: {
      width: 240,
      margin: 'auto'
    }
  })
);
