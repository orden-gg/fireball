import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

import mapSvg from 'assets/images/icons/map.svg';
import listSvg from 'assets/images/icons/list.svg';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    alertWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 192px)'
    },
    alertInner: {
        backgroundColor: theme.palette.secondary.dark,
        maxWidth: 400,
        margin: 'auto',
        padding: 24,
        borderRadius: 4
    },
    alert: {
        marginBottom: 24
    },
    clientCitadel: {
        position: 'fixed',
        left: 0,
        top: 70,
        right: 0,
        bottom: 70
    }
}));

const routersStyles = makeStyles(theme => ({
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
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

const clientNavStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1, 0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
        alignSelf: 'center'
    },
    navItem: {
        margin: 4,
        position: 'relative'
    },
    button: {
        paddingRight: 12,
        paddingLeft: 12,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.secondary.dark, .2),
            borderColor: alpha(theme.palette.secondary.light, .2),
            color: alpha('#fff', .3)
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2),
            },
        }
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginLeft: 8,
        '.Mui-disabled &': {
            opacity: .4
        },
        '.active &, .active:hover &': {
            color: theme.palette.secondary.main
        },
        'Mui-disabled.active &, Mui-disabled.active:hover &': {
            color: theme.palette.primary.main
        }
    },
    buttonLoader: {
        width: 28,
        height: 14,
        marginLeft: 8
    },
    realmViewSwitch: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: 'hidden',
        opacity: 0,
        transition: '.5s ease-in-out',
        width: 62,
        height: 34,
        padding: 7,
        willChange: 'opacity, transform',

        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url(${mapSvg})`,
                }
            },
        },
        '& .MuiSwitch-thumb': {
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${listSvg})`,
            },
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2
        },
        '& .Mui-checked+.MuiSwitch-track': {
            // opacity: 1,
            backgroundColor: '#fff'
        },

        '.active + &': {
            marginLeft: theme.spacing(2),
            opacity: 1,
            visibility: 'visible'
        }
    }
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

export {
    styles as default,
    clientNavStyles,
    routersStyles,
    loadRewardsStyles,
    parcelSinglePage
};
