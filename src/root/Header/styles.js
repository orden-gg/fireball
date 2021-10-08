import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const useStyles = makeStyles((theme) => ({
    toolbar: {
        width: '100%',
        justifyContent: 'space-between',
        padding: '11px 14px 11px 24px',
        background: theme.palette.background.default,
        boxShadow: '0px 4px 16px rgba(29, 32, 37, 0.67)',
        position: 'fixed !important',
        top: 0,
        zIndex: theme.zIndex.appBar,
        [theme.breakpoints.up('md')]: {
            padding: '11px 32px'
        },
    },
    highlight: {
        color: theme.palette.primary.main
    },
    logo: {
        width: 45,
        height: 45,
        marginRight: 15
    },
    logoText: {
        whiteSpace: 'nowrap',
        fontSize: '1.125rem',
        letterSpacing: '0.04em'
    },
    logoWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start'
        }
    },
    navWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.dark,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        padding: '70px 0 20px',
        height: '100vh',
        maxWidth: '80vw',
        width: 400,
        zIndex: theme.zIndex.appBar,
        transform: 'translateX(100%)',
        transition: 'transform .3s ease-in-out',
        '&.opened': {
            transform: 'translateX(0)'
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            position: 'static',
            transform: 'translateX(0)',
            height: 'unset',
            padding: 0,
            transition: 'none',
            maxWidth: '100%',
            width: '100%'
        }
    },
    navigation: {
        lineHeight: 'unset',
        textAlign: 'center',
        '& > *': {
            textDecoration: 'none',
            textTransform: 'uppercase'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'flex-end',
            borderRight: '1px solid #3C404A',
            paddingRight: 25,
        }
    },
    navLink: {
        display: 'block',
        fontSize: 20,
        color: theme.palette.common.white,
        fontWeight: 500,
        letterSpacing: '0.04em',
        position: 'relative',
        transition: '.3s',
        padding: '16px 0',
        '&.active': {
            background: alpha(theme.palette.primary.main, .03)
        },
        '&.active, &:hover': {
            color: theme.palette.primary.main
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 16,
            margin: '0 15px',
            padding: 0,
            '&.active': {
                background: 'transparent'
            },
        },
    },
    navLinkBox: {
        display: 'inline-block',
        position: 'relative',
        '& span': {
            position: 'absolute',
            top: -12,
            right: 2,
            fontSize: 10,
            color: theme.palette.primary.main,
            textTransform: 'none'
        }
    },
    navHamburger: {
        position: 'relative',
        zIndex: theme.zIndex.appBar,
        marginLeft: 10,
        [theme.breakpoints.up('md')]: {
            display: 'none !important'
        }
    },
    socialLinkList: {
        justifyContent: 'center',
        flexWrap: 'nowrap',
        fontSize: '1rem',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 25,
            width: 'unset',
            margin: '5px 0'
        }
    },
    socialLink: {
        '&:hover': {
            textDecoration: 'none'
        }
    },
    socialLinkJoin: {
        position: 'absolute',
        display: 'none',
        bottom: -11,
        right: 5,
        '& > span': {
            fontSize: '0.55rem',
            letterSpacing: '1px'
        },
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
    },
    iconButton: {
        color: '#fd9af9',
        '& img': {
            width: 26,
            height: 26
        }
    },
    iconButtonText: {
        marginLeft: '8px'
    },
    group: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 25
    }
}));