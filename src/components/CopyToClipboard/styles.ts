import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import copyIcon from 'assets/images/icons/copy.svg';

export const styles = makeStyles(() => createStyles({
    icon: {
        fontSize: 14
    },
    button: {
        background: alpha('#000', .2),
        borderRadius: 4,
        padding: 5,
        '&:hover': {
            background: alpha('#000', .4)
        }
    },
    block: {
        position: 'relative',
        background: alpha('#000', .2),
        padding: '4px 12px',
        cursor: `url(${copyIcon}) 8 10, pointer`,
        transition: 'all .3s ease-in-out',
        '&:hover': {
            background: alpha('#000', .4)
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
        transition: 'all .3s ease-in-out'
    }
}));
