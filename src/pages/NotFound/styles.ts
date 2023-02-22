import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    container: {
      height: 'calc(100vh - 88px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24
    }
  })
);
