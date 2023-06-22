import { alpha } from '@mui/material';
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
      flexShrink: 0,
      minWidth: 180,
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      boxShadow: `5px 0 5px 0 ${theme.palette.secondary.dark}`,
      paddingBottom: theme.spacing(3),
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        maxWidth: '30%'
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
        paddingBottom: 0
      }
    },
    guildSidebarFooter: {
      marginTop: 'auto'
    },
    guildSidebarButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    guildSidebarButton: {
      margin: '0 8px'
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
    guildAssets: {
      padding: theme.spacing(0, 1),
      '& > div': {
        justifyContent: 'center'
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
    guildJoin: {
      // zIndex: 1,
      // margin: 'auto',
      border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`
      // background: theme.palette.background.secondary
    },
    joinButtonProgress: {
      color: alpha(theme.palette.common.white, 0.2),
      marginLeft: theme.spacing(1)
    },
    guildEdit: {
      // position: 'absolute',
      // right: theme.spacing(1),
      // bottom: theme.spacing(1),
      // zIndex: 1
    },
    guildError: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
