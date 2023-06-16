import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const keyframes = {
  move: {
    '100%': {
      transform: 'none'
    }
  },
  show: {
    '100%': {
      opacity: 1
    }
  }
};

export const guildBannerStyles = makeStyles((theme) =>
  createStyles({
    guildBanner: {
      minHeight: '30%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        position: 'relative'
      }
    },
    guildBannerBg: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: alpha('#000', 0.7)
      }
    },
    guildBannerInner: {
      padding: theme.spacing(2, 3),
      position: 'relative',
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(1),
        position: 'static',
        padding: theme.spacing(2, 1)
      }
    },
    guildBannerTop: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    guildBannerText: {
      fontSize: 14
    },
    guildLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translateY(-10%)',
      opacity: 0,
      animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move'
    },
    guildLogoImage: {
      maxHeight: 85,
      '&.placeholder': {
        color: theme.palette.secondary.dark
      }
    },
    guildName: {
      textAlign: 'center',
      color: theme.palette.primary.main,
      fontSize: 24,
      opacity: 0,
      animation: '1s ease .5s forwards $show',
      lineHeight: 1.2,
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        fontSize: 18
      }
    },
    buttonPrev: {
      position: 'absolute',
      top: '50%',
      left: theme.spacing(1),
      transform: 'translateY(-50%) scaleX(-1)',
      [theme.breakpoints.down('md')]: {
        width: 24,
        height: 24,
        '& .MuiSvgIcon-root': {
          fontSize: 16
        }
      }
    },
    buttonNext: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing(1),
      transform: 'translateY(-50%)',
      [theme.breakpoints.down('md')]: {
        width: 24,
        height: 24,
        '& .MuiSvgIcon-root': {
          fontSize: 16
        }
      }
    },
    guildTreasuryButton: {
      position: 'absolute',
      right: 16,
      top: 16,
      backgroundColor: alpha('#0cb259', 0.3),
      border: `2px solid ${alpha('#0cb259', 0.2)}`,
      '&:hover': {
        backgroundColor: alpha('#0cb259', 0.6)
      }
    },
    '@keyframes show': keyframes.show,
    '@keyframes move': keyframes.move
  })
);
