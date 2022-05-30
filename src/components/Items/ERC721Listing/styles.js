import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    listing: {
        height: 28,
        position: 'relative',
        fontSize: 14,
        fontWeight: 600,
        '& p': {
            margin: 0
        },
    },
    listingShadow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 1,
        height: '100%',
        filter: 'grayscale(1)',
        color: alpha(theme.palette.common.white, .5),
        background: alpha('#707070', .2),
        paddingLeft: 12,
        cursor: 'default'
    },
    listingLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 1,
        height: '100%',
        background: alpha(theme.palette.rarity.uncommon, .2),
        transition: 'background-color .3s ease-in-out',
        '&:hover': {
            background: alpha(theme.palette.rarity.uncommon, .3),
        },
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
        color: 'greenyellow',
        display: 'flex',
        alignItems: 'center'
    },
    lastPriceDown: {
        color: 'orange',
        display: 'flex',
        alignItems: 'center'
    },
    token: {
        marginLeft: 4
    }
}));

export default styles;
