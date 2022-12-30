import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        position: 'relative',
        margin: '8px 0',
        background: alpha('#000', .1),
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        minWidth: 28,
        '& img': {
            display: 'block'
        }
    },
    activeIcon: {
        width: 28,
        height: 28,
        padding: 4,
        borderRadius: 4,
        background: alpha('#000', .2)
    },
    unactiveIcon: {
        filter: 'grayscale(1)'
    },
    tooltipRow: {
        display: 'flex',
        '& span': {
            marginRight: 8
        }
    },
    placeholder: {
        width: 28,
        height: 28,
        borderRadius: 4
    }
}));
