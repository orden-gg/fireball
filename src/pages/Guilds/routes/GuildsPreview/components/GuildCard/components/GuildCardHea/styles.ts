import { createStyles, makeStyles } from '@mui/styles';

export const guildCardFooterStyles = makeStyles((theme) =>
  createStyles({
    guildCardFooter: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2, 1, 0)
    }
  })
);
