import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
    createStyles({
        anvilCalc: {
            alignItems: 'center',
            display: 'flex'
        },
        anvilCalcSection: {
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1
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
