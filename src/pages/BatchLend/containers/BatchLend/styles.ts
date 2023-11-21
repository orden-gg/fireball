import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    batchLendContainer: {
      display: 'flex'
    },
    infoPanel: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 8,
      fontWeight: 'bold',
      background: alpha('#000', 0.2),
      borderRadius: '4px 4px 0 0'
    },
    countWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    gotchi: {
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      textAlign: 'center',
      position: 'relative',
      border: '3px solid gray',
      alignItem: 'space-between',
      cursor: 'pointer',
      padding: '0 5px 5px',
      '&:hover': {
        textDecoration: 'none',
        zIndex: 1
      },
      '&.haunt1': {
        backgroundColor: theme.palette.haunts.h1
      },
      '&.haunt2': {
        backgroundColor: theme.palette.haunts.h2
      }
    },
    gotchiHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '8px',
      margin: '0 -5px',
      backgroundColor: alpha('#000', 0.2)
    },
    imageContainer: {
      position: 'relative'
    },
    gotchiKinship: {
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 500,
      cursor: 'default',
      padding: '2px 16px',
      color: '#fff',
      position: 'relative',
      minWidth: 70,
      justifyContent: 'center',
      '.common &': {
        textShadow: `0 0 3px ${darken(theme.palette.rarity.common, 0.7)}`
      },
      '.rare &': {
        textShadow: `0 0 3px ${darken(theme.palette.rarity.rare, 0.7)}`
      },
      '.mythical &': {
        textShadow: `0 0 3px ${darken(theme.palette.rarity.mythical, 0.7)}`
      },
      '.godlike &': {
        textShadow: `0 0 3px ${darken(theme.palette.rarity.godlike, 0.7)}`
      },
      '&:hover': {
        background: alpha('#000', 0.1)
      },
      '&:before, &:after': {
        content: '""',
        height: 0,
        borderTop: '26px solid transparent',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        position: 'absolute'
      },
      '&:before': {
        width: 'calc(100% + 8px)',
        borderLeftWidth: 12,
        borderRightWidth: 12,
        top: 0,
        '.common &': {
          borderTopColor: theme.palette.rarity.common
        },
        '.rare &': {
          borderTopColor: theme.palette.rarity.rare
        },
        '.mythical &': {
          borderTopColor: theme.palette.rarity.mythical
        },
        '.godlike &': {
          borderTopColor: theme.palette.rarity.godlike
        }
      },
      '&:after': {
        width: '100%',
        borderTopWidth: 23,
        top: 0,
        '.common &': {
          borderTopColor: darken(theme.palette.rarity.common, 0.3)
        },
        '.rare &': {
          borderTopColor: darken(theme.palette.rarity.rare, 0.3)
        },
        '.mythical &': {
          borderTopColor: darken(theme.palette.rarity.mythical, 0.3)
        },
        '.godlike &': {
          borderTopColor: darken(theme.palette.rarity.godlike, 0.3)
        }
      },
      '& span': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
      }
    },
    gotchiKinshipIcon: {
      marginRight: 2
    },
    settingsContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 0px'
    },
    settingWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '4px'
    },
    settingLabel: {
      textAlign: 'center'
    },
    settingValue: {
      color: '#00FFFF',
      textAlign: 'center'
    },
    settingsButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '12px'
    }
  })
);
