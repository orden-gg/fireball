import { createStyles, makeStyles } from '@mui/styles';

export const guildDashboardStyles = makeStyles((theme) =>
  createStyles({
    guildCitadel: {
      maxWidth: '100%',
      margin: theme.spacing(0, 2),
      zIndex: 2,
      '& .citadel-interface': {
        top: 30
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '60%',
        margin: 0,
        '& .citadel-interface': {
          top: 10,
          right: 5
        }
      }
    }
  })
);
