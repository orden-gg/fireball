import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildsPreviewStyles = makeStyles((theme) =>
  createStyles({
    guildsWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 1920,
      padding: theme.spacing(7, 2, 2),
      margin: 'auto',
      backgroundColor: darken(theme.palette.background.secondary, 0.2),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5, 1.5, 1.5)
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    },
    guildsList: {
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px,1fr))',
      gridGap: theme.spacing(2),
      marginTop: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
        gridGap: theme.spacing(2),
        marginTop: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
        gridGap: theme.spacing(1)
      }
    },
    guildButton: {
      color: theme.palette.text.primary,
      width: '100%',
      cursor: 'pointer',
      background: 'none',
      padding: theme.spacing(0),
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.secondary.dark,
      '&:disabled': {
        opacity: 0.3,
        cursor: 'default'
      }
    },
    guildBody: {
      flex: '1 1 auto',
      textAlign: 'left',
      padding: theme.spacing(2),
      position: 'relative',
      zIndex: 1,
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1)
      }
    },
    guildName: {
      fontWeight: 700,
      transition: 'color .2s linear',
      fontSize: 18,
      lineHeight: 1.2,
      margin: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: 14
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    guildLogo: {
      maxWidth: '30%',
      minWidth: '30%',
      minHeight: '100%',
      position: 'relative',
      paddingBottom: '30%',
      backgroundColor: '#000',
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
    guildAssetList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      marginTop: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap'
    },
    guildAssetItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(1)
      }
    },
    guildAssetItemIcon: {
      width: 24,
      maxWidth: 24,
      maxHeight: 24,
      [theme.breakpoints.down('md')]: {
        width: 20,
        maxWidth: 20,
        maxHeight: 20
      }
    },
    guildAssetAmountLoader: {
      minWidth: 30,
      [theme.breakpoints.down('md')]: {
        minWidth: 20
      }
    },
    guildAssetAmount: {
      display: 'inline-block',
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        marginLeft: theme.spacing(0.5)
      }
    },
    divider: {
      width: '100%',
      marginTop: theme.spacing(1),
      opacity: 0.5
    },
    guildCreate: {
      position: 'absolute',
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      zIndex: 1
    }
  })
);
