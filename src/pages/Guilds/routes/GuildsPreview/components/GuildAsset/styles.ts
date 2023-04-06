import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildAssetStyles = makeStyles((theme) =>
  createStyles({
    guildAssetItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: alpha(theme.palette.common.black, 0.2),
      padding: theme.spacing(1),
      border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
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
    }
  })
);
