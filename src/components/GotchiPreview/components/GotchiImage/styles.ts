import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const gotchiImageStyles = makeStyles((theme) =>
  createStyles({
    gotchiSvg: {
      position: 'relative',
      cursor: 'ew-resize'
    },
    imageSlider: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      display: 'flex'
    },
    side: {
      flex: 1
    },
    sideLine: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 1,
      width: '20%',
      height: 3,
      transition: 'left .3s',
      backgroundColor: theme.palette.primary.main,
      '&.view1': {
        left: '20%'
      },
      '&.view2': {
        left: '40%'
      },
      '&.view3': {
        left: '60%'
      },
      '&.view4': {
        left: '80%'
      }
    },
    setName: {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      bottom: theme.spacing(0.75),
      textAlign: 'center',
      '& span': {
        padding: theme.spacing(0, 0.5),
        textShadow: `0 0 2px ${theme.palette.secondary.dark},
                        0 0 2px ${theme.palette.secondary.dark},
                        0 0 2px ${theme.palette.secondary.dark}`,
        fontWeight: 600,
        color: theme.palette.rarity.legendary,
        backgroundColor: alpha(theme.palette.secondary.dark, 0.6)
      }
    }
  })
);
