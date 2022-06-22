import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        padding: 24,
        minHeight: 'calc(100vh - 74px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

