import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildDashboardPanelStyles = makeStyles((theme) =>
  createStyles({
    guildDashboardPanel: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
      borderRadius: 4,
      overflowY: 'auto',
      position: 'relative'
    },
    guildDashboardPanelLoader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100%'
    },
    guildDashboardPanelLoaderIcon: {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
      borderRadius: '50%',
      padding: 6,
      '& img': {
        display: 'block'
      }
    }
  })
);
