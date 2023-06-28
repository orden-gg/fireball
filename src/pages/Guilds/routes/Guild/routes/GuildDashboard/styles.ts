import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildDashboardStyles = makeStyles((theme) =>
  createStyles({
    guildDashboard: {
      maxHeight: 'calc(100vh - 139px)',
      padding: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        maxHeight: 'unset'
      }
    },
    guildDashboardInner: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      '& > div': {
        width: 'calc(50% - 8px)',
        display: 'flex',
        flexDirection: 'column'
      },
      [theme.breakpoints.down('md')]: {
        display: 'block',
        '& > div': {
          width: '100%'
        }
      }
    },
    guildDashboardNoData: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    guildDashboardAlchemicaList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    guildDashboardAlchemicaItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '50%',
      '& span': {
        marginLeft: 4
      }
    },
    guildDashboardLink: {
      display: 'inline-block',
      cursor: 'pointer',
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        borderColor: 'transparent'
      }
    },
    guildDashboardTable: {
      '& th, & td': {
        padding: '2px 6px',
        border: 'none',
        textAlign: 'center',
        fontSize: 12
      },
      '& th': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    guildDashboardTableHead: {
      bakcgroundColor: theme.palette.primary.dark
    },
    guildDashboardTableBody: {
      // bakcgroundColor: theme.palette.primary.dark
      '& tr:nth-child(2n)': {
        backgroundColor: alpha(theme.palette.secondary.dark, 0.9)
      }
    }
  })
);
