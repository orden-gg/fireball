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
        padding: '4px 12px',
        cursor: 'pointer',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            background: alpha('#000', .3),
        },
        '& span': {
            position: 'relative',
            zIndex: 1
        },
        '&:hover $blockIcon': {
            opacity: 1
        }
    },
    blockIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 11,
        opacity: .5,
        transition: 'all .3s ease-in-out',
    }
}));

export default styles;
