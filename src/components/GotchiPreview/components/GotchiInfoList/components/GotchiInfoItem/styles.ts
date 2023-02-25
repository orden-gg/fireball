import { createStyles, makeStyles } from '@mui/styles';

export const gotchiInfoItemStyles = makeStyles(theme =>
  createStyles({
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.secondary,
      padding: theme.spacing(1),
      margin: '1% .5% 0',
      borderRadius: 3,
      fontSize: 16,
      flex: '1 1 auto',
      maxWidth: 200
    },
    infoLabel: {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(0.5)
    },
    tooltip: {
      '& .MuiTooltip-tooltip': {
        maxWidth: 340
      }
    }
  })
);
