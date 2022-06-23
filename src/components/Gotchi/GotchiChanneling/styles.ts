import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        margin: '8px 0',
        background: alpha('#000', .1),
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        '& img': {
            display: 'block'
        }
    },
    unactiveIcon: {
        filter: 'grayscale(1)'
    },
    placeholder: {
        width: 28,
        height: 28,
        borderRadius: 4
    }
}));
