import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: 24,
      minHeight: 'calc(100vh - 74px)',
      maxWidth: 1280,
      width: '100%',
      margin: 'auto',
      '& h5': {
        fontSize: 16,
        margin: '0 0 12px',
        '& span': {
          padding: '4px 8px',
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: 4
        }
      }
    },
    inputRow: {
      marginBottom: 12,
      '& > div': {
        minWidth: '100%'
      },
      '& p': {
        marginLeft: 0
      }
    },
    progress: {
      color: 'inherit',
      marginLeft: theme.spacing(1)
    }
  })
);
