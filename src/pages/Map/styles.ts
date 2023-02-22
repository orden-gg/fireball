import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    mapWrapper: {
      position: 'relative',
      height: 'calc(100vh - 74px)'
    },
    citadel: {
      '& .citadel-interface': {
        top: theme.spacing(8)
      }
    }
  })
);
