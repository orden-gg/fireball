import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    owner: {
      margin: '0 2px',
      '&:hover': {
        textDecoration: 'underline'
      },
      '$gotchiBadges &': {
        marginRight: 'auto'
      },
      '.narrowed &': {
        fontSize: 12
      }
    }
  })
);
