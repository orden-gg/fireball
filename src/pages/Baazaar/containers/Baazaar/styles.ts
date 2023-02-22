import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    container: {
      padding: '51px 24px 0',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    containerNav: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 4
    }
  })
);
