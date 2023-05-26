import { createStyles, makeStyles } from '@mui/styles';

export const guildHomeStyles = makeStyles((theme) =>
  createStyles({
    guildInfoList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      margin: theme.spacing(0, 0, 1, 0)
    },
    guildInfoListItem: {
      display: 'flex'
    }
  })
);
