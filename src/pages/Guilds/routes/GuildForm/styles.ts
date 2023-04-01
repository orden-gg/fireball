import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import guildsCard from 'assets/images/navigation/guilds.jpg';

export const guildFormStyles = makeStyles((theme) =>
  createStyles({
    formWrapper: {
      padding: theme.spacing(4, 0),
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: theme.palette.common.black,
      '&:before': {
        content: '""',
        background: `url("${guildsCard}") no-repeat center center fixed`,
        opacity: 0.2,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        filter: 'blur(10px)',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    },
    formContent: {
      postion: 'relative',
      zIndex: 1,
      maxWidth: 1000,
      width: '100%',
      margin: '10px auto',
      padding: theme.spacing(3, 2),
      backgroundColor: alpha(theme.palette.background.paper, 0.7),
      boxShadow: `0 0 10px 10px ${alpha(theme.palette.background.secondary, 0.5)}`
    },
    form: {
      width: '100%'
    },
    formTitle: {
      textAlign: 'center',
      color: theme.palette.primary.light,
      textShadow: `0 0 3px ${theme.palette.common.black}, 0 1px 1px ${theme.palette.common.black}, 0 1px 1px ${theme.palette.common.black}, 0 1px 1px ${theme.palette.common.black}, 0 1px 1px ${theme.palette.common.black}, 0 0 3px ${theme.palette.common.black}`
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
