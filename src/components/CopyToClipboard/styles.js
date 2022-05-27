import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    icon: {
        fontSize: 14
    },
    button: {
        background: alpha('#000', .2),
        borderRadius: 4,
        padding: 5,
        '&:hover': {
            background: alpha('#000', .4),
        }
    },
    block: {
        position: 'relative',
        background: alpha('#000', .1),
        padding: 4,
        cursor: 'pointer',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            background: alpha('#000', .4),
        },
        '& span': {
            position: 'relative',
            zIndex: 1
        }
    },
    blockIcon: {
        position: 'absolute',
        right: 4,
        bottom: 4,
        fontSize: 12,
        opacity: .7
    }
}));

export default styles;
