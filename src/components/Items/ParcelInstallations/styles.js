import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        paddingTop: 4,
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
        }
    },
    installation: {
        flexShrink: 0,
        position: 'relative',
        '& + $installation': {
            marginLeft: 8
        }
    },
    installationImage: {
        height: '100%',
        background: alpha('#000', .2),
        borderRadius: 4,
        overflow: 'hidden',
        '& > div': {
            paddingBottom: '100%',
            margin: 0
        }
    },
    installationLevel: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 14,
        height: 14,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 2,
        lineHeight: 1,
        background: theme.palette.secondary.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'center'
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
        margin: '4px 0',
        padding: '0 4px'
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
        },
        '& + $inner': {
            marginLeft: 8
        }
    },
    countdown: {
        color: 'orange'
    }
}));

export default styles;
