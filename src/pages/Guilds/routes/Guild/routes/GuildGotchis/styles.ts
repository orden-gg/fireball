import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildContentStyles = makeStyles((theme) =>
  createStyles({
    sortingPanelWrap: {
      boxShadow: `0 10px 8px ${theme.palette.background.secondary}`,
      zIndex: 2
    },
    guildGotchis: {
      height: '100%',
      paddingLeft: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        height: '80vh',
        paddingRight: theme.spacing(2)
      }
    },
    memberName: {
      textAlign: 'center'
    },
    memberGotchis: {
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
      display: 'grid'
    },
    gotchi: {
      borderRadius: 4,
      width: 150,
      padding: theme.spacing(2.5),
      transition: 'background-color .3s ease-in-out',
      '& img': {
        height: 90,
        width: 90,
        filter: 'drop-shadow( 0px 0px 7px rgba(255,255,209,.5))'
      },
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 0.1)
      }
    },
    gotchiName: {
      textAlign: 'center',
      fontSize: 20,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingBottom: theme.spacing(2)
    },
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
    },
    loading: {
      margin: 'auto'
    },
    noData: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
