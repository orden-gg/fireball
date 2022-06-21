import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
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

export default styles;
