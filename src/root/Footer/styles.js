import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    footerWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: '5px 24px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            padding: '5px 32px'
        }
    },
    toolbar: {
        padding: '12px 0',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            flexWrap: 'nowrap'
        }
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 4,
        padding: '4px 8px',
        color: theme.palette.primary.main,
        marginRight: 8
    },
    footerCopyright: {
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        margin: '12px auto 0',
        [theme.breakpoints.up('md')]: {
            margin: 0
        }
    },
    btnsGroup: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    btn: {
        '& + $btn': {
            marginLeft: 4
        }
    },
    playBtn: {
        fontSize: 12,
        textTransform: 'lowercase',
        padding: '2px 4px',
        minWidth: 56,
        marginLeft: 8,
        backgroundColor: alpha('#fff', .05),
        '&:hover': {
            backgroundColor: alpha('#fff', .1)
        }
    },
    discordIcon: {
        '& path': {
            fill: '#fff'
        }
    },
    socialJoin: {
        position: 'absolute',
        bottom: -10,
        right: 4,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        fontSize: 10,
        opacity: .8
    },
    divider: {
        margin: '0 12px',
        height: 20
    }
}));

export default styles;
