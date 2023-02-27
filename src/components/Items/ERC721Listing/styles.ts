import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    listing: {
      height: 28,
      position: 'relative',
      fontSize: 14,
      fontWeight: 600,
      '& p': {
        margin: 0
      }
    },
    listingShadow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 1,
      height: '100%',
      filter: 'grayscale(1)',
      color: alpha(theme.palette.common.white, 0.5),
      background: alpha('#707070', 0.2),
      paddingLeft: 12
    },
    listingLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 1,
      height: '100%',
      background: alpha(theme.palette.rarity.uncommon, 0.2),
      transition: 'background-color .3s ease-in-out',
      '&:hover': {
        background: alpha(theme.palette.rarity.uncommon, 0.3)
      }
    },
    tooltipInner: {
      display: 'flex',
      justifyContent: 'center'
    },
    tooltipItem: {
      display: 'flex',
      alignItems: 'center'
    },
    tooltipDivider: {
      marginRight: 4,
      marginLeft: 2
    },
    lastPriceUp: {
      color: 'greenyellow',
      display: 'flex',
      alignItems: 'center'
    },
    lastPriceDown: {
      color: 'orange',
      display: 'flex',
      alignItems: 'center'
    },
    token: {
      marginLeft: 4
    }
  })
);
