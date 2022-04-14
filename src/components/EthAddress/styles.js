import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: 8,
        borderRadius: 4,
    },
    link: {
        fontSize: 16,
        fontWeight: 500,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));

export default styles;
