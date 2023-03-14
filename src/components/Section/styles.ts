import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    section: {
      padding: '25px 0 25px',
      [theme.breakpoints.up('md')]: {
        padding: '50px 0'
      }
    }
  })
);
