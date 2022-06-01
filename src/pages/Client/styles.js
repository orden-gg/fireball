import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        padding: '7px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    },
    loginNav: {
        maxWidth: 500,
        margin: '16px auto',
        width: '100%'
    },
    routesNav: {
        display: 'flex',
        overflow: 'auto',
        marginBottom: 4
    },
    clientCitadel: {
        position: 'fixed',
        left: 0,
        top: 70,
        right: 0,
        bottom: 70
    },
    customBtn: {
        padding: 6,
        margin: 4,
        minWidth: 50,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2),
            },
        }
    }
}));

const routersStyles = makeStyles(theme => ({
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridAutoRows: '1fr',
    },
    listItem: {
        height: '100%'
    },
    lightText: {
        color: theme.palette.primary.main
    },
    loaderBox: {
        textAlign: 'center',
        paddingTop: 32
    },
    sortWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    sortInner: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px'
    },
    sortText: {
        marginRight: 12
    },
    filtersButton: {
        padding: 0,
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    filtersInner: {
        fontSize: 18,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px 12px',
        '& span': {
            width: 18
        }
    },
}));

const loadRewardsStyles = makeStyles(theme => ({
    loadWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 16
    },
    loadButton: {
        marginRight: '16px',
        paddingRight: '24px !important',
        position: 'relative',
        overflow: 'hidden'
    },
    loadReward: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    loadRoundReward: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '16px',
        marginLeft: '4px'
    },
    loadLabel: {
        position: 'absolute',
        top: 0,
        right: 15,
        transform: 'rotate(-90deg)',
        transformOrigin: 'top right',
        fontSize: 10,
        fontWeight: 700,
        background: theme.palette.error.main,
        pointerEvents: 'none',
        borderRadius: '0 0 2px 2px',
        margin: 0,
        lineHeight: 1,
        padding: '3px 4px 2px',
        color: '#000'
    }
}));

const parcelSinglePage = makeStyles(theme => ({
    nameWrapper: {
        whiteSpace: 'nowrap',
        position: 'relative',
        '& p': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        '&.two-lined': {
            backgroundColor: alpha(theme.palette.secondary.dark, .25),
            margin: '20px 0 0',
            padding: 4,
            borderRadius: 2,
            whiteSpace: 'inherit',
            minHeight: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s ease-in-out',
            minWidth: '100%',
            '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.dark, .5),
            }
        }
    },
    name: {
        fontWeight: '500',
        lineHeight: '1.4',
        textTransform: 'capitalize',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px',
                    ${theme.palette.secondary.main} -1px -1px 0px',
                    ${theme.palette.secondary.main} 1px -1px 0px',
                    ${theme.palette.secondary.main} -1px 1px 0px',
                    ${theme.palette.secondary.main} 1px 1px 0px`,

        '.tooltip-wearable &': { // name
            fontSize: 14
        },
    },
    textHighlight: {
        '&.humble': {
            color: theme.palette.realm.humble
        },
        '&.reasonable': {
            color: theme.palette.realm.reasonable
        },
        '&.spacious': {
            color: theme.palette.realm.spacious
        },
        '&.partner': {
            color: theme.palette.realm.partner
        },
        '&.realm-generic': {
            color: '#c1a415'
        },
    },
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 14,
        color: '#fff'
    },
    parcelInfoContainer: {
        maxWidth: 300
    },
    parcelInfoWrap: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        }
    },
    parcelImageContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > canvas': {
            maxWidth: '100%'
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    },
    parcelWrapContainer: {
        paddingTop: 30
    },
    notListedInBaazaar: {
        margin: '15px 0',
        padding: 20,
        border: `1px solid ${alpha(theme.palette.primary.main, .3)}`,
    },
    ownerLink: {
        margin: '15px 0',
        '& > a': {
            color: theme.palette.primary.main
        },
        '& > a:hover': {
            textDecoration: 'underline'
        }
    },
    parcelTransactions: {
        display: 'flex',
        justifyContent: 'center',
        '& > ul': {
            maxWidth: 650,
            width: '100%'
        },
        [theme.breakpoints.up('xs')]: {
            padding: '20px 0 0 48px',
        }
    },
    parcelTransactionsWrapper: {
        height: 'max-content'
    },
    parcelTransactionsItem: {
        height: '100%',
        width: '100%',
        border: `1px solid ${alpha(theme.palette.primary.main, .3)}`
    },
    reserveTitle: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'inline'
        }
    },
    parcelTransactionsItemHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    parcelTransactionsItemInner: {
        margin: 'auto',
        padding: 10
    },
    priceIcon: {
        width: 15
    },
    address: {
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    noContent: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        paddingTop: 50
    },
    alchemicaImg: {
        width: 20
    },
    alchemicaContainer:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        '& img': {
            marginRight: 10
        }
    }
}));

const accountStyles = makeStyles(theme => ({
    accountContainer: {
        marginBottom: 20
    },
    account: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    accountPanel: {
        maxWidth: 1120,
        margin: 'auto'
    },
    alert: {
        marginTop: 12,
        [theme.breakpoints.up('md')]: {
            marginTop: 0
        }
    }
}));

const actionStyles = makeStyles(theme => ({
    buttonCompleted: {
        pointerEvents: 'none',
        opacity: .5
    }
}));

export {
    styles as default,
    routersStyles,
    loadRewardsStyles,
    parcelSinglePage,
    accountStyles,
    actionStyles
};
