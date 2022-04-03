import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    listing: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
        position: 'relative',
        marginBottom: -4,
        marginRight: -1,
        fontSize: 14,
        fontWeight: 600,
        '& p': {
            margin: 0
        },
    },
    listingShadow: {
        display: 'flex',
        alignItems: 'center',
        filter: 'grayscale(1)',
        color: alpha(theme.palette.common.white, .5),
    },
    listingLink: {
        display: 'flex',
        alignItems: 'center'
    },
    tooltipInner: {
        display: 'flex',
        justifyContent: 'center'
    },
    tooltipItem: {
        display: 'flex',
        alignItems: 'center'
    },
    tooltipDivider: {
        marginRight: 4,
        marginLeft: 2
    },
    lastPriceUp: {
        color: theme.palette.success.light
    },
    lastPriceDown: {
        color: theme.palette.warning.main
    }
}));

export default styles;
