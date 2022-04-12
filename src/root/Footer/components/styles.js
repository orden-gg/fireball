import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.online': {
            color: '#4ded55'
        },
        '&.offline': {
            color: theme.palette.error.main
        }
    },
    icon: {
        fontSize: 16,
        marginRight: 4
    },
    count: {
        fontWeight: 500
    },
    onlinePlaceholder: {
        width: 60,
        height: 20,
        borderRadius: 4
    },
}));

export default styles;
