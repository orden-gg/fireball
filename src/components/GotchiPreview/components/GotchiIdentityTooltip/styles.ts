import { createStyles, makeStyles } from '@mui/styles';

export const gotchiIdentityTooltipStyles = makeStyles(theme =>
  createStyles({
    identityWrapper: {
      padding: theme.spacing(1, 0)
    },
    identityTitle: {
      textAlign: 'right',
      fontWeight: 400,
      fontSize: 14,
      margin: 0,
      '& span': {
        color: theme.palette.primary.main
      }
    },
    identityList: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    identityItem: {
      fontSize: 16,
      flexBasis: 56,
      transition: '.2s',
      textAlign: 'center',
      margin: '3px 4px',
      backgroundColor: theme.palette.background.secondary,
      '&:hover': {
        color: theme.palette.primary.light
      }
    },
    divider: {
      margin: theme.spacing(1.5, 0.5, 1)
    },
    gotchiIdTooltip: {
      '& .MuiTooltip-tooltip': {
        background: 'none',
        padding: 0
      }
    }
  })
);
