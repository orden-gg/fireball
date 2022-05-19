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
        marginTop: 12
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        '& p': {
            margin: '0 0 0 8px',
            color: theme.palette.primary.main
        }
    },
    panels: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '0 -4px'
    },
    panel: {
        background: alpha('#000', .2),
        padding: 8,
        margin: 4,
        textAlign: 'center',
        '& span': {
            color: 'orange',
            marginLeft: 8
        },
        '& p': {
            flexGrow: 1
        },
        '& img': {
            marginLeft: 4
        }
    },
    panelTitle: {
        fontSize: 18
    },
    panelInner: {
        display: 'flex',
    },
    parcelRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alpha('#000', .1),
        borderRadius: 4,
        margin: 4,
        padding: '8px 8px'
    },
    noStats: {
        color: 'orange'
    }
}));

export default styles;
