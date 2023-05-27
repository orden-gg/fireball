import { createStyles, makeStyles } from '@mui/styles';

export const guildHomeStyles = makeStyles((theme) =>
  createStyles({
    guildInfoWrapper: {
      height: '100%',
      padding: '8px 16px'
    },
    guildInfoList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      margin: theme.spacing(0, 0, 1, 0)
    },
    guildInfoListItem: {
      display: 'flex'
    },
    guildInfoEmptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
