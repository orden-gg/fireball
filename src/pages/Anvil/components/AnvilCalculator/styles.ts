import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    anvilCalc: {
      display: 'flex'
    },
    anvilCalcSection: {
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1
    },
    anvilCalcCore: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    anvilCalcOptions: {
      marginTop: 55
    },
    anvilCalcArrow: {
      fontSize: 64,
      opacity: 0.15,
      flexShrink: 1,
      minWidth: 64
    },
    anvilCalcButton: {
      fontSize: 48
    }
  })
);
