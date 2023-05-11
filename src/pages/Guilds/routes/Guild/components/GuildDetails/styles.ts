import { createStyles, makeStyles } from '@mui/styles';

export const guildDetailsStyles = makeStyles((theme) =>
  createStyles({
    guildSocials: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        position: 'static'
      }
    },
    guildSocialButton: {
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down('md')]: {
        width: 30,
        height: 30,
        padding: 5,
        margin: theme.spacing(0, 0.5)
      },
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    guildSocialIcon: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 20
      }
    },
    detailsButton: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        padding: '2px 5px'
      }
    },
    detailsWrapper: {
      margin: theme.spacing(3, 0),
      opacity: 0,
      animation: '2s ease-out 1s forwards $show',
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2, 0)
      },
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        right: 10,
        top: 10,
        margin: 0
      }
    },
    detailsModal: {
      width: 800,
      padding: theme.spacing(2)
    },
    detailsArrow: {
      fontSize: 24,
      margin: '0 -6px',
      [theme.breakpoints.down('md')]: {
        fontSize: 22,
        margin: '0 -5px'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        margin: '0 -4px'
      }
    },
    detailsBody: {
      backgroundColor: theme.palette.background.secondary,
      marginTop: theme.spacing(3),
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(4, 6),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(1),
        padding: theme.spacing(3)
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
      }
    },
    detailsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    detailsItem: {
      '& + $detailsItem': {
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
          marginTop: theme.spacing(3)
        }
      }
    },
    detailTitle: {
      textAlign: 'center',
      fontSize: 26,
      margin: 0,
      color: theme.palette.primary.main,
      [theme.breakpoints.down('md')]: {
        fontSize: 22
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      }
    },
    detailBody: {
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(1)
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0.5)
      }
    },
    detailText: {
      fontSize: 16,
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: 14
      }
    },
    guildWearables: {
      display: 'flex',
      justifyContent: 'center'
    },
    guildWearable: {
      width: 30,
      height: 20,
      margin: theme.spacing(1)
    },
    modal: {
      maxWidth: 1000,
      padding: 12
    },
    '@keyframes show': {
      '100%': {
        opacity: 1
      }
    }
  })
);