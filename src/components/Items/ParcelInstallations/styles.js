import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    container: {
        background: alpha('#000', .2),
        borderTop: `2px solid ${alpha('#000', .2)}`,
        borderBottom: `2px solid ${alpha('#000', .2)}`
    },
    installation: {
        padding: '4px 8px',
        minHeight: 72
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    upgrade: {
        flexBasis: '100% !important',
        display: 'flex',
        justifyContent: 'space-between'
    },
    placeholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '12px 0',
        padding: '0 12px'
    },
    placeholderInner: {
        borderRadius: 4
    },
    placeholderWarning: {
        color: 'orange',
        padding: '26px 0'
    },
    subtitle: {
        color: 'deeppink'
    },
    ready: {
        color: 'lime'
    },
    inner: {
        '& span': {
            color: 'yellow'
        }
    },
    countdown: {
        color: 'orange'
    }
}));

export default styles;
