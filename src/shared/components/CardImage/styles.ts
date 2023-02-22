import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    imageWrapper: {
      paddingBottom: '45%',
      width: '65%',
      margin: theme.spacing(1, 'auto', 1),
      position: 'relative'
    },
    image: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  })
);
