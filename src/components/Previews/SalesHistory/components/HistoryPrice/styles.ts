import { createStyles, makeStyles } from '@mui/styles';

export const priceStyles = makeStyles(() =>
  createStyles({
    price: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '25%',
      '& img': {
        marginLeft: 4
      }
    }
  })
);
