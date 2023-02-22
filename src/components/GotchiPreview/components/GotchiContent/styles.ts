import { createStyles, makeStyles } from '@mui/styles';

export const gotchiContentStyles = makeStyles(theme =>
  createStyles({
    gotchiContent: {
      marginLeft: theme.spacing(2),
      flex: 1,
      position: 'relative',
      paddingBottom: 40
    }
  })
);
