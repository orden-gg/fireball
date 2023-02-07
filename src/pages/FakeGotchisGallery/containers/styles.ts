import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    fakeGotchisGalleryContainer: {
      padding: '16px 0 0',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    fakeGotchisGalleryContainerNav: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 4
    },
    fakeGotchisGalleryNavButton: {
      margin: 4,
      paddingRight: 12,
      paddingLeft: 12,
      color: '#fff',
      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark
      },
      '&.active, &.active:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
      }
    },
    fakeGotchisGalleryNavName: {
      marginRight: 8,
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    fakeGotchisGalleryNavLabel: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.palette.primary.main,
      '.active &, .active:hover &': {
        color: theme.palette.secondary.main
      }
    },
    fakeGotchisGalleryButtonLoader: {
      width: 28,
      height: 14
    }
  })
);
