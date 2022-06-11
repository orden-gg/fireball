import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    userPanel: {
        position: 'fixed',
        right: theme.spacing(2),
        top: theme.spacing(1.5),
        zIndex: theme.zIndex.appBar + 10,
        display: 'flex',
        alignItems: 'center'
    }
}));

export default styles;
