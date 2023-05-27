import { createStyles, makeStyles } from '@mui/styles';

export const guildStyles = makeStyles((theme) =>
  createStyles({
    guildWrapper: {
      position: 'relative',
      display: 'flex',
      minHeight: 'calc(100vh - 74px)',
      backgroundColor: theme.palette.background.secondary,
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
    guildSidebar: {
      flexBasis: '25%',
      minWidth: 180,
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      boxShadow: `5px 0 5px 0 ${theme.palette.secondary.dark}`,
      paddingBottom: theme.spacing(4),
      zIndex: 3,
      [theme.breakpoints.down('md')]: {
        maxWidth: '30%'
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
        paddingBottom: 0
      }
    },
    guildContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(1)
      }
    },
    backButton: {
      position: 'absolute',
      left: '100%',
      top: theme.spacing(1),
      marginLeft: theme.spacing(1),
      zIndex: 4,
      [theme.breakpoints.down('md')]: {
        width: 33,
        height: 33,
        top: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
      '& .MuiSvgIcon-root': {
        fontSize: 30,
        transition: 'translate .2s ease',
        [theme.breakpoints.down('md')]: {
          fontSize: 20
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: 24
        }
      },
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    guildEdit: {
      position: 'absolute',
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      zIndex: 1
    },
    guildJoin: {
      position: 'absolute',
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      zIndex: 1
    },
    guildError: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
