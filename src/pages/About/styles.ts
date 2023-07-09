import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const aboutPageStyles = makeStyles((theme) =>
  createStyles({
    container: {
      maxWidth: 1200,
      padding: theme.spacing(2),
      margin: 'auto'
    },
    inner: {
      padding: theme.spacing(2),
      borderRadius: 8,
      backgroundColor: alpha('#000', 0.1)
    },
    title: {
      textAlign: 'center',
      color: theme.palette.primary.main,
      fontWeight: 700,
      marginBottom: theme.spacing(2)
    },
    text: {
      margin: theme.spacing(2, 0),
      lineHeight: 1.6,
      textAlign: 'center',
      padding: theme.spacing(0, 2)
    },
    subText: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 2)
    },
    list: {
      listStyle: 'none',
      padding: theme.spacing(2),
      margin: theme.spacing(1, 0)
    },
    listItem: {
      margin: theme.spacing(1, 0),
      position: 'relative',
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(4),
      lineHeight: 1.8,

      '&:before': {
        content: '""',
        position: 'absolute',
        left: 3,
        top: 9,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main
      }
    },
    link: {
      color: theme.palette.primary.main,

      '&:hover': {
        textDecoration: 'none'
      }
    }
  })
);
