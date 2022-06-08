import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 4
        }
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        padding: '8px 4px 4px'
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textShadow: `1px 1px 0 ${alpha('#000', .6)}`,
        '&.over': {
            color: '#fc6565'
        }
    },
    innerIcon: {
        marginRight: 4
    },
    splits: {
        background: alpha('#000', .2),
        padding: '4px 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& + $splits': {
            marginTop: 2
        },
        '& span': {
            marginRight: 2,
            '&.highlight': {
                color: theme.palette.rarity.legendary
            }
        }
    },
    tokens: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 26,
        padding: '0 4px'
    },
    tokensStats: {
        display: 'flex',
        justifyContent: 'center',
        padding: '4px 0 0',
        fontSize: 16
    },
    token: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: '50%',
        textShadow: `1px 1px 0 ${alpha('#000', .6)}`,
        fontWeight: 500,
        '& img': {
            marginRight: 4
        },
        '& span': {
            opacity: .9
        },
        '&.fud': {
            color: theme.palette.alchemica.fud
        },
        '&.fomo': {
            color: theme.palette.alchemica.fomo
        },
        '&.alpha': {
            color: theme.palette.alchemica.alpha
        },
        '&.kek': {
            color: theme.palette.alchemica.kek
        }
    },
    income: {
        fontWeight: 500
    },
    activity: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha('#000', .2),
        padding: '0 2px',
        borderRadius: 4,
        marginLeft: 8,
        width: 24,
        height: 24,
        '&:hover': {
            backgroundColor: alpha('#000', .3)
        }
    },
    activityTop: {
        color: '#00ff00'
    },
    activityModerate: {
        color: '#ff6800'
    },
    activityBad: {
        color: '#ff0000'
    },
    alchemicaPower: {
        fontSize: 12,
        marginLeft: 4,
        color: theme.palette.primary.main
    },
    bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 4
    }
}));

export default styles;
