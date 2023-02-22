import { createStyles, makeStyles } from '@mui/styles';

export const gotchiInventoryStyles = makeStyles(theme =>
  createStyles({
    items: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))',
      gridGap: theme.spacing(1),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
      justifyContent: 'center'
    },
    item: {
      justifyContent: 'start'
    },
    name: {
      whiteSpace: 'normal'
    }
  })
);
