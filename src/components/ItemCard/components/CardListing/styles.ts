import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const styles = makeStyles((theme) =>
  createStyles({
    listings: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
      padding: theme.spacing(0.2, 0.5),
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      }
    },
    error: {
      color: theme.palette.error.light
    },
    noSales: {
      color: theme.palette.error.light,
      margin: 0,
      fontSize: 14
    },
    soldOutLink: {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    lastPrice: {
      color: theme.palette.text.primary,
      paddingLeft: '4px'
    },
    lastPriceUp: {
      color: theme.palette.success.light
    },
    lastPriceDown: {
      color: theme.palette.warning.main
    },
    coin: {
      marginRight: theme.spacing(-0.5)
    },
    listingsLoader: {
      width: 60,
      height: 25
    },
    tooltipTitle: {
      color: theme.palette.primary.main,
      textAlign: 'center'
    },
    tooltipInner: {
      display: 'flex',
      justifyContent: 'center'
    },
    tooltipItem: {
      display: 'flex',
      alignItems: 'center',
      '& + &:before': {
        content: '"->"',
        display: 'inline-block',
        margin: theme.spacing(0, 0.5, 0, 0.25),
        color: theme.palette.primary.main
      }
    },
    token: {
      margin: theme.spacing(0, 0.5)
    }
  })
);
