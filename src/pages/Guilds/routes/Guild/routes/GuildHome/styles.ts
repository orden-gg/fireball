import { createStyles, makeStyles } from '@mui/styles';

export const guildHomeStyles = makeStyles((theme) =>
  createStyles({
    guildInfoWrapper: {
      padding: '8px 16px'
    },
    guildInfoList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px,1fr))',
      gridGap: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
        gridGap: theme.spacing(2),
        marginTop: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
        gridGap: theme.spacing(1)
      }
    },
    playerBestGotchi: {
      position: 'absolute'
    },
    guildInfoAddress: {
      display: 'flex',
      margin: '8px 4px 0px 0px'
    },
    guildInfoEmptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
