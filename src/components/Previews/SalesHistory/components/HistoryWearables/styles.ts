import { createStyles, makeStyles } from '@mui/styles';

export const historyWearablesStyles = makeStyles((theme) =>
  createStyles({
    wearables: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexBasis: 450
    },
    wearable: {
      borderRadius: 5,
      border: '1px solid',
      width: 42,
      height: 42,
      padding: theme.spacing(0.5),
      margin: theme.spacing(0.5)
    },
    image: {
      width: '100%',
      paddingBottom: '100%',
      margin: 0
    }
  })
);
