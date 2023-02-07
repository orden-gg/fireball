import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    sidebar: {
      maxHeight: 'calc(100vh - 177px)',
      overflowY: 'auto'
    },
    section: {
      '& + $section': {
        marginTop: 12
      }
    },
    filtersWrapper: {
      paddingBottom: 12
    },
    buttonsWrapper: {
      padding: 12,
      display: 'flex',
      justifyContent: 'space-between'
    },
    wearableHeader: {
      marginLeft: '-8px',
      justifyContent: 'space-between'
    },
    overridedSlot: {
      margin: 0,
      padding: '4px 0 0 6px'
    },
    benefits: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.common.white,
      fontSize: 12,
      fontWeight: 600,
      padding: 0,
      marginTop: 4
    },
    itemTypeValue: {
      color: '#06b6b6'
    },
    benefitValue: {
      textAlign: 'center',
      fontStyle: 'italic'
    }
  })
);
