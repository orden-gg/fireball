import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildAssetsStyles = makeStyles((theme) =>
  createStyles({
    guildCardAssetsList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      display: 'flex',
      flexWrap: 'wrap'
    },
    guildCardAssetItem: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(1, 0.5, 0, 0),
      backgroundColor: alpha(theme.palette.common.black, 0.2),
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(1)
      },
      '&.zero': {
        opacity: 0.3
      },
      '&.card': {
        display: 'block',
        textAlign: 'center',
        border: `1px solid ${alpha(theme.palette.common.black, 0.2)}`,
        borderRadius: 4,
        padding: theme.spacing(1, 2, 1, 2),
        '& $guildCardAssetIconWrap': {
          display: 'block',
          margin: 'auto',
          width: 40,
          height: 32
        },
        '& $guildCardAssetAmount': {
          margin: '4px 0 0'
        }
      }
    },
    guildCardAssetIconWrap: {
      display: 'flex',
      width: 20,
      height: 16
    },
    guildCardAssetIcon: {
      margin: 'auto',
      height: '100%',
      maxWidth: '100%',
      maxheight: '100%'
    },
    guildCardAssetAmountLoader: {
      minWidth: 30,
      [theme.breakpoints.down('md')]: {
        minWidth: 20
      }
    },
    guildCardAssetAmount: {
      display: 'inline-block',
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        marginLeft: theme.spacing(0.5)
      }
    },
    '@keyframes fadeIn': {
      '100%': {
        opacity: 1
      }
    }
  })
);
