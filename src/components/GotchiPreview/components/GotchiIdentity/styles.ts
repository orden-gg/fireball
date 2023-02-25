import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const gotchiIdentityStyles = makeStyles(theme =>
  createStyles({
    identityWrapper: {
      padding: theme.spacing(1, 0.5),
      flex: '1 1 auto',
      backgroundColor: alpha('#000', 0.3),
      borderRadius: 5,
      marginLeft: theme.spacing(2.5),
      lineHeight: 1
    },
    identityTitle: {
      textAlign: 'center',
      fontWeight: 400,
      fontSize: 16,
      margin: 0
    },
    identityGroup: {
      display: 'flex'
    },
    identityGroupItem: {
      margin: theme.spacing(0.5, 0.5, 0),
      flex: '1 1 auto'
    },
    identityGroupBadge: {
      padding: theme.spacing(1, 0.5)
    },
    identityTooltip: {
      paddingBottom: theme.spacing(1)
    },
    identityTooltipTitle: {
      textAlign: 'right',
      fontWeight: 400,
      margin: theme.spacing(1, 0, 0),
      fontSize: 14,
      '& span': {
        color: theme.palette.primary.main
      }
    },
    identityTooltipList: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    identityTooltipItem: {
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
    },
    tooltip: {
      '& .MuiTooltip-tooltip': {
        maxWidth: 340
      }
    }
  })
);
