import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildDashboardStyles = makeStyles((theme) =>
  createStyles({
    guildDashboard: {
      maxHeight: 'calc(100vh - 139px)',
      padding: theme.spacing(2)
    },
    guildDashboardInner: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      '& > div': {
        flexBasis: 'calc(50% - 8px)',
        display: 'flex',
        flexDirection: 'column'
      }
    },
    guildDashboardList: {
      paddingTop: 25,
      '& > div:nth-child(2n + 1)': {
        backgroundColor: alpha(theme.palette.secondary.dark, 0.9)
      }
    },
    guildDashboardListHeader: {
      background: `${theme.palette.primary.dark} !important`,
      color: '#000',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    },
    guildDashboardListItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
      borderRadius: 4,
      fontSize: 12,
      '& > div': {
        textAlign: 'center'
      }
    },
    guildDashboardListItemTiny: {
      flexBasis: '10%'
    },
    guildDashboardListItemShort: {
      flexBasis: '20%'
    },
    guildDashboardListItemLong: {
      flexBasis: '40%'
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
      flexBasis: '50%'
    },
    guildDashboardLink: {
      display: 'inline-block',
      cursor: 'pointer',
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        borderColor: 'transparent'
      }
    }
  })
);
