import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        background: alpha('#000', .2),
        padding: 12,
        borderRadius: 4,
        maxWidth: 900,
        margin: 'auto',
    },
    inner: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    },
    content: {
        flexGrow: '1',
    },
    contentTop: {
        textAlign: 'center',
        marginBottom: 12,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'space-between',
            '& div': {
                marginTop: 3
            }
        }
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 12,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0,
            marginRight: 20
        }
    },
    badges: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
        }
    },
    badge: {
        padding: '8px 12px',
        marginRight: 8,
        marginBottom: 8,
        display: 'flex',
        alignItems: 'center',
    },
    highlighted: {
        color: theme.palette.primary.main,
        marginRight: 4
    },
    name: {
        fontWeight: '500',
        fontSize: 24,
        margin: '0 0 4px',
        textTransform: 'capitalize',
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        }
    },
    sales: {
        textAlign: 'center',
        marginTop: 12
    },
    salesTitle: {
        fontWeight: '500',
        fontSize: 20,
        margin: '0 0 8px',
    },
    boosts: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
        },
    },
    boost: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        padding: 4,
        border: '2px solid transparent',
        fontWeight: 500,
        marginRight: 8,
        fontSize: 16,
        textShadow: '1px 1px 0 black',
        lineHeight: 1,
        '& img': {
            marginRight: 4
        },
        '&.fud': {
            background: alpha(theme.palette.alchemica.fud, .1),
            borderColor: alpha(theme.palette.alchemica.fud, .3),
            color: theme.palette.alchemica.fud
        },
        '&.fomo': {
            background: alpha(theme.palette.alchemica.fomo, .1),
            borderColor: alpha(theme.palette.alchemica.fomo, .3),
            color: theme.palette.alchemica.fomo
        },
        '&.alpha': {
            background: alpha(theme.palette.alchemica.alpha, .1),
            borderColor: alpha(theme.palette.alchemica.alpha, .3),
            color: theme.palette.alchemica.alpha
        },
        '&.kek': {
            background: alpha(theme.palette.alchemica.kek, .1),
            borderColor: alpha(theme.palette.alchemica.kek, .3),
            color: theme.palette.alchemica.kek
        }
    }
}));

export default styles;
