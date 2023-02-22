import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    priceRoot: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      fontWeight: 800,
      color: theme.palette.common.white,
      '.vertical &': {
        width: '20%'
      }
    }
  })
);
