import { alpha } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {
        padding: '51px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    loginNav: {
        maxWidth: 500,
        margin: '16px auto',
        width: '100%'
    },
    routesNav: {
        display: 'flex',
        overflow: 'initial',
        marginBottom: 4
    },
    clientCitadel: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 70,
        '& .citadel-interface, & .citadel-filters': {
            top: 110
        }
    },
    customBtn: {
        padding: 6,
        margin: 4,
        minWidth: 50,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2)
            }
        }
    }
}));

export const routersStyles = makeStyles(theme => createStyles({
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridAutoRows: '1fr'
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
            backgroundColor: theme.palette.secondary.dark
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
    }
}));

export const loadRewardsStyles = makeStyles(theme => createStyles({
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

export const parcelSinglePage = makeStyles(theme => createStyles({
    nameWrapper: {
        whiteSpace: 'nowrap',
        position: 'relative',
        '& p': {
            textOverflow: 'ellipsis',
            overflow: 'hidden'
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
                backgroundColor: alpha(theme.palette.secondary.dark, .5)
            }
        }
    },
    name: {
        fontWeight: 500,
        lineHeight: '1.4',
        textTransform: 'capitalize',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px',
                    ${theme.palette.secondary.main} -1px -1px 0px',
                    ${theme.palette.secondary.main} 1px -1px 0px',
                    ${theme.palette.secondary.main} -1px 1px 0px',
                    ${theme.palette.secondary.main} 1px 1px 0px`,

        '.tooltip-wearable &': { // name
            fontSize: 14
        }
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
        }
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
        border: `1px solid ${alpha(theme.palette.primary.main, .3)}`
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
            padding: '20px 0 0 48px'
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

export const accountStyles = makeStyles(theme => createStyles({
    accountContainer: {
        marginBottom: 20
    },
    account: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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

export const actionStyles = makeStyles(() => createStyles({
    buttonCompleted: {
        pointerEvents: 'none',
        opacity: .5
    },
    buttonSpinner: {
        marginLeft: 8
    },
    marginBottom: {
        marginBottom: 8
    }
}));

export const warehouseStyles = makeStyles((theme) => createStyles({
    benefits: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        marginTop: 4
    },
    itemTypeValue: {
        color: '#06b6b6'
    },
    benefitValue: {
        textAlign: 'center',
        fontStyle: 'italic'
    }
}));

export const fakeGotchiStyles = makeStyles((theme) => createStyles({
    fakeGotchiCard: {
        height: '100%',
        position: 'relative'
    },
    fakeGotchiLink: {
        height: '100%',
        cursor: 'pointer',
        '&:hover .drop': {
            background: alpha('#000', 0.2)
        }
    },
    fakeGotchiHeader: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        margin: 0,
        zIndex: 5
    },
    fakeGotchiBody: {
        justifyContent: 'flex-start'
    },
    fakeGotchiName: {
        fontSize: 15,
        color: '#fff'
    },
    fakeGotchiImage: {
        width: '100%',
        marginTop: 0,
        paddingBottom: '70%',
        '& img': {
            objectFit: 'cover'
        }
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        marginTop: 4
    },
    descriptionText: {
        color: '#06b6b6'
    },
    descriptionFooter: {
        textAlign: 'center',
        fontStyle: 'italic'
    },
    author: {
        fontWeight: 700,
        color: 'burlywood'
    }
}));
