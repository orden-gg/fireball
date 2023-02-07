import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    balance: {
      backgroundColor: theme.palette.secondary.dark,
      minWidth: 34,
      fontWeight: 600,
      padding: theme.spacing(0, 0.5),
      color: theme.palette.common.white,
      lineHeight: 1.6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    equippedTitle: {
      maxWidth: 200
    },
    equippedTitleText: {
      margin: '0 0 2px'
    },
    equippedTitleLink: {
      color: theme.palette.primary.main,
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    itemBalanceDivider: {
      margin: '0 2px'
    }
  })
);
