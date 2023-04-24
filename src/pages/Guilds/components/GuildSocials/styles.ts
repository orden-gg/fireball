import { createStyles, makeStyles } from '@mui/styles';

export const guildSocialsStyles = makeStyles((theme) =>
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
    }
  })
);
