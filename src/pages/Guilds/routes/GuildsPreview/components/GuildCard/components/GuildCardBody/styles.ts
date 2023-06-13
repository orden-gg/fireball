import { createStyles, makeStyles } from '@mui/styles';

export const guildCardBodyStyles = makeStyles((theme) =>
  createStyles({
    guildCardBody: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      padding: theme.spacing(1),
      position: 'relative',
      zIndex: 1
    }
  })
);
