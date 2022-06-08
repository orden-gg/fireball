import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    container: {
        padding: '4px 8px',
        background: alpha('#000', .2),
        borderRadius: 4,
        minHeight: 50, // ! BEWARE
        alignItems: 'center',
        borderTop: `2px solid ${alpha('#000', .2)}`,
        '& img': {
            display: 'block'
        },
        '& p': {
            margin: 0
        }
    },
    unactiveIcon: {
        filter: 'grayscale(1)'
    },
    placeholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        padding: '0 12px'
    },
    placeholderInner: {
        borderRadius: 4
    },
    placeholderWarning: {
        color: 'orange',
        padding: '20px 0'
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        color: 'aqua'
    },
    countdown: {
        color: 'orange'
    }
}));

export default styles;
