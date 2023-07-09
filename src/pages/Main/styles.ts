import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import { MAX_GOTCHIS_IN_ROW } from 'shared/constants';

import bg from 'assets/images/bgs/cover.jpg';

export const styles = makeStyles(() =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      minHeight: 'calc(100vh - 74px)',
      background: '#282537',
      backgroundImage: 'radial-gradient(top, circle cover, #3c3b52 0%, #252233 80%)'
    }
  })
);

export const aboutStyles = makeStyles((theme) =>
  createStyles({
    aboutCointainer: {
      margin: '20px 0',
      textAlign: 'center'
    },
    aboutButton: {
      fontFamily: 'Amatic SC, cursive',
      fontSize: '30px',
      fontWeight: 700,
      padding: '6px 24px',
      lineHeught: 1.5,
      color: '#ff6b7c',
      backgroundColor: alpha('#000', 0.1),
      textShadow: `0 0 2px ${alpha(theme.palette.secondary.dark, 0.75)},
                        0 0 2px ${alpha(theme.palette.secondary.dark, 0.75)},
                        0 0 2px ${alpha(theme.palette.secondary.dark, 0.75)}`,
      '&:hover': {
        background: '#ff6b7c'
      }
    },
    modal: {
      maxWidth: 1000,
      padding: theme.spacing(3, 0)
    },
    container: {
      maxHeight: 400,
      overflow: 'auto',
      padding: theme.spacing(0, 2)
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
      backgroundColor: theme.palette.background.default,
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

export const bgStyles = makeStyles((theme) =>
  createStyles({
    homeBg: {
      position: 'relative',
      height: '100vh',
      background: `url(${bg}) center`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom -50px center',
      [theme.breakpoints.down('xl')]: {
        backgroundPosition: 'bottom center'
      }
    }
  })
);

export const teamStyles = makeStyles((theme) =>
  createStyles({
    gotchisWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
      gridGap: theme.spacing(0.5),
      width: '100%',
      marginTop: theme.spacing(5)
    },
    gotchisRow: {
      position: 'absolute',
      height: 1,
      bottom: '40%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      '&.active': {
        animation: '5s $show forwards'
      }
    },
    gotchisRow3: {
      paddingBottom: '16%',
      left: '28%',
      right: '28%',
      '& $homeGotchi': {
        transform: 'scale(.8)',
        width: `${100 / MAX_GOTCHIS_IN_ROW[2]}%`
      }
    },
    gotchisRow2: {
      paddingBottom: '9.5%',
      left: '5%',
      right: '5%',
      '& $homeGotchi': {
        transform: 'scale(.8)',
        width: `${100 / MAX_GOTCHIS_IN_ROW[1]}%`
      }
    },
    gotchisRow1: {
      left: 0,
      right: 0,
      bottom: '44%',
      '& $homeGotchi': {
        width: `${100 / MAX_GOTCHIS_IN_ROW[0]}%`
      }
    },
    gotchisSemicircle: {
      position: 'absolute',
      zIndex: 1,
      left: '46.2%',
      bottom: '20%',
      width: '80%',
      paddingBottom: '22%',
      '&.active': {
        animation: '5s $show forwards'
      }
    },
    gotchiBox: {
      position: 'absolute',
      width: '10%'
    },
    homeGotchi: {
      padding: '0 5px 5px',
      position: 'relative',
      zIndex: 1,
      cursor: 'pointer',
      '&:hover': {
        '& $gotchiName span': {
          overflow: 'visible'
        },
        '& $gotchiAvatar': {
          filter: 'none'
        }
      }
    },

    gotchiAvatar: {
      width: '100%',
      paddingBottom: '100%',
      position: 'relative',
      filter: 'sepia(0.6)',
      transition: '.3s',
      marginTop: 5,
      '& > img': {
        position: 'absolute',
        left: '1%',
        top: '1%',
        width: '98%',
        height: '98%'
      }
    },
    gotchiName: {
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.text.primary,
      fontWeight: 500,
      position: 'relative',
      transition: 'all .2s ease-in-out',
      padding: 5,
      fontSize: 14,
      margin: 0,
      textShadow: '0 0 2px #000',
      '& span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        margin: 0
      }
    },
    '@keyframes show': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  })
);
