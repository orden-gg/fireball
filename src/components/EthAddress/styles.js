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
        fontWeight: 500,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    linkIcon: {
        fontSize: 14
    },
    text: {
        fontWeight: 500
    },
    button: {
        marginLeft: 4,
        '& + $button': {
            marginLeft: 0
        }
    }
}));

export default styles;
