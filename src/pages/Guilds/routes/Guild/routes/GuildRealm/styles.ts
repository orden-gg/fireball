import { createStyles, makeStyles } from '@mui/styles';

export const guildRealmStyles = makeStyles((theme) =>
  createStyles({
    guildCitadel: {
      maxWidth: '100%',
      zIndex: 2,
      '& .citadel-interface': {
        top: 30
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '60%',
        '& .citadel-interface': {
          top: 10,
          right: 5
        }
      }
    }
  })
);
