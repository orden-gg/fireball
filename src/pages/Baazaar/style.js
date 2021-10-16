import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    baazaar: {
        padding: 24,
        width: 'calc(100vw + 24px)'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));
