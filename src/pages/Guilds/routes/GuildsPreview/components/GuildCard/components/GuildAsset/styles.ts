import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildAssetStyles = makeStyles((theme) =>
  createStyles({
    guildAssetItem: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(1, 0.5, 0, 0),
      backgroundColor: alpha(theme.palette.common.black, 0.2),
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(1)
      }
    },
    guildAssetIconWrap: {
      display: 'flex',
      width: 20,
      height: 16
    },
    guildAssetIcon: {
      margin: 'auto',
      height: '100%',
      maxWidth: '100%',
      maxheight: '100%'
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
    }
  })
);
