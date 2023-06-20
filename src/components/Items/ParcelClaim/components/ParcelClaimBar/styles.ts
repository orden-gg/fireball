import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const parcelClaimBarStyles = makeStyles((theme) =>
  createStyles({
    claimAlchemica: {
      transition: 'font-size .2s',
      position: 'relative',
      lineHeight: 1
    },
    fud: {
      backgroundColor: alpha(darken(theme.palette.alchemica.fud, 0.5), 0.8),
      color: theme.palette.alchemica.fud
    },
    fomo: {
      backgroundColor: alpha(darken(theme.palette.alchemica.fomo, 0.5), 0.8),
      color: theme.palette.alchemica.fomo
    },
    alpha: {
      backgroundColor: alpha(darken(theme.palette.alchemica.alpha, 0.5), 0.8),
      color: theme.palette.alchemica.alpha
    },
    kek: {
      backgroundColor: alpha(darken(theme.palette.alchemica.kek, 0.5), 0.8),
      color: theme.palette.alchemica.kek
    },
    claimAlchemicaBar: {
      height: '100%',
      width: '100%',
      position: 'relative',
      textAlign: 'center',
      '&:before': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'currentColor',
        opacity: 0.5,
        height: '100%',
        width: '100%',
        left: 0
      }
    },
    amount: {
      position: 'relative',
      zIndex: 1,
      opacity: 0,
      color: theme.palette.common.white,
      transition: 'opacity .1s 0s',
      display: 'block',
      fontWeight: 500,
      textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
      padding: theme.spacing(0, 1),
      '.parcel:hover &, .active &': {
        opacity: 1,
        transition: 'opacity .3s .1s'
      }
    },
    supplyRate: {
      position: 'absolute',
      left: 0,
      padding: theme.spacing(0, 1),
      top: 0,
      zIndex: 1,
      fontWeight: 500,
      transition: 'opacity .1s 0s',
      opacity: 0,
      textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
      backgroundImage: `linear-gradient(to right, transparent 0%, ${alpha('#000', 0.5)} 100%)`,
      '.parcel:hover &, .active &': {
        opacity: 1,
        transition: 'opacity .3s .1s'
      }
    },
    capacities: {
      position: 'absolute',
      right: 0,
      padding: theme.spacing(0, 1),
      top: 0,
      zIndex: 1,
      fontWeight: 500,
      transition: 'opacity .1s 0s',
      opacity: 0,
      textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
      backgroundImage: `linear-gradient(to right, transparent 0%, ${alpha('#000', 0.5)} 100%)`,
      '.parcel:hover &, .active &': {
        opacity: 1,
        transition: 'opacity .3s .1s'
      }
    }
  })
);
