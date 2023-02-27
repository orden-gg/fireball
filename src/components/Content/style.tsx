import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: '64px 24px 0',
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        alignItems: 'flex-start'
      }
    },
    noPadding: {
      padding: 0
    },
    sidebar: {
      borderRadius: 4,
      background: theme.palette.background.paper,
      marginBottom: 24,
      [theme.breakpoints.up('sm')]: {
        width: 300,
        flexShrink: 0,
        marginLeft: 24,
        marginBottom: 0
      }
    },
    inner: {
      background: theme.palette.background.paper,
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        flexGrow: 1,
        alignSelf: 'stretch'
      }
    }
  })
);

export const ContentInnerStyles = makeStyles((theme) => ({
  content: {
    background: theme.palette.background.paper,
    borderRadius: 4,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      flexGrow: 1
    },
    '&.loading': {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
}));
