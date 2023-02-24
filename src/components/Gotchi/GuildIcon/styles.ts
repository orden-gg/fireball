import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    guild: {
      margin: theme.spacing(0.5)
    },
    guildAvatar: {
      width: 32,
      height: 32,
      border: '2px solid #fff'
    }
  })
);
