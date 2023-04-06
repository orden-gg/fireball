import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildCardStyles = makeStyles((theme) =>
  createStyles({
    guildCard: {
      color: theme.palette.text.primary,
      width: '100%',
      padding: theme.spacing(0),
      border: `1px solid ${theme.palette.common.black}`,
      backgroundColor: `${alpha(theme.palette.common.black, 0.2)}`,
      position: 'relative',
      transition: 'background .3s',
      '&:hover': {
        backgroundColor: `${alpha(theme.palette.common.black, 0.3)}`
      }
    },
    guildTop: {
      display: 'flex'
    },
    guildLogo: {
      maxWidth: '30%',
      minWidth: '30%',
      minHeight: '100%',
      position: 'relative',
      paddingBottom: '30%',
      zIndex: 1
    },
    guildLogoImage: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '80%',
      maxHeight: '80%',
      '&.placeholder': {
        color: alpha(theme.palette.secondary.dark, 0.7)
      }
    },
    guildBody: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      padding: theme.spacing(1),
      position: 'relative',
      zIndex: 1
    },
    guildName: {
      fontWeight: 700,
      fontFamily: 'Amatic SC, cursive',
      transition: 'color .2s linear',
      fontSize: 26,
      lineHeight: 1.2,
      padding: theme.spacing(1, 0, 1),
      borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
      margin: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: 14
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    guildAssetsList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      marginTop: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap'
    },
    guildWearables: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    divider: {
      opacity: 0.5,
      margin: theme.spacing(0, 1)
    },
    guildBottom: {
      padding: theme.spacing(1)
    },
    guildDescription: {
      textAlign: 'left',
      fontWeight: 300,
      lineHeight: 1.6,
      opacity: 0.7,
      margin: 0
    },
    guildViewBtn: {
      display: 'block',
      margin: theme.spacing(1, 'auto', 0),
      width: 150
    }
  })
);
