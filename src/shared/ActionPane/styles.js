import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    pane: {
        position: 'fixed',
        top: '50%',
        left: '100%',
        // right: 0,
        transform: 'translateY(-50%)',
        background: theme.palette.secondary.dark,
        padding: 20,
        borderRadius: '4px 0 0 4px',
        zIndex: 20
    },
}));

export default styles
