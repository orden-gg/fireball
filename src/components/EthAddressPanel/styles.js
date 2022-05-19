import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        background: alpha('#000', .2),
        padding: 16,
        borderRadius: 4
    },
    placeholder: {
        textAlign: 'center',
    },
    powered: {
        display: 'inline-flex',
        alignItems: 'center',
        color: '#fff',
        background: alpha('#000', .2),
        borderRadius: 4,
        padding: '4px 8px',
        textDecoration: 'none',
        transition: 'background .3s ease-in-out',
        '&:hover': {
            background: alpha('#000', .5),
        },
        '& img': {
            marginLeft: 8
        },
        '& span': {
            color: theme.palette.primary.main,
            marginLeft: 8,
        }
    },
    poweredWrapper: {
        textAlign: 'right',
    }
}));

export default styles;
