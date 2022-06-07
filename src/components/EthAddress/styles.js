import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    container: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: 8,
        borderRadius: 4
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
        marginLeft: 5,
        '& + $button': {
            marginLeft: 2
        }
    },
    linkButton: {
        background: alpha('#000', .2),
        borderRadius: 4,
        padding: 5,
        '&:hover': {
            background: alpha('#000', .4)
        }
    }
}));

export default styles;
