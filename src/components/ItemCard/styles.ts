import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const styles = makeStyles(theme => createStyles({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .1),
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .1),
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .1),
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .1),
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1),
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1),
            color: theme.palette.rarity.godlike
        },
        '&.drop': {
            backgroundColor: alpha(theme.palette.rarity.drop, .1),
            color: theme.palette.rarity.drop
        },
        '&.humble': {
            backgroundColor: alpha(theme.palette.realm.humble, .1),
            color: theme.palette.realm.humble
        },
        '&.reasonable': {
            backgroundColor: alpha(theme.palette.realm.reasonable, .1),
            color: theme.palette.realm.reasonable
        },
        '&.spacious': {
            backgroundColor: alpha(theme.palette.realm.spacious, .1),
            color: theme.palette.realm.spacious
        },
        '&.golden': {
            backgroundColor: alpha(theme.palette.rarity.golden, .1),
            color: theme.palette.rarity.golden
        },
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .1),
            color: theme.palette.realm.partner
        },
        '&.haunt1': {
            backgroundColor: alpha(theme.palette.haunts.h1, .1),
            color: theme.palette.haunts.h1
        },
        '&.haunt2': {
            backgroundColor: alpha(theme.palette.haunts.h2, .1),
            color: theme.palette.haunts.h2
        },
    }
}));

export const innerStyles = makeStyles(theme => createStyles({
    inner: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    }
}));

export const balanceStyles = makeStyles(theme => createStyles({
    balance: {
        backgroundColor: theme.palette.secondary.dark,
        minWidth: 34,
        fontWeight: 600,
        padding: theme.spacing(0, .5),
        color: theme.palette.common.white,
        lineHeight: 1.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    equippedTitle: {
        maxWidth: 200
    },
    equippedTitleText: {
        margin: '0 0 2px'
    },
    equippedTitleLink: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    itemBalanceDivider: {
        margin: '0 2px'
    },
}));

export const totalPriceStyles = makeStyles(theme => createStyles({
    total: {
        backgroundColor: 'currentColor',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0 0 4px',
        justifyContent: 'center',
        fontWeight: 600,
        border: `3px solid ${alpha(theme.palette.secondary.dark, .5)}`,
        '& span': {
            color: theme.palette.secondary.main
        }
    },
    totalValueLoader: {
        width: 70,
        height: 27
    }
}));

export const listingsStyles = makeStyles(theme => createStyles({
    listings: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        padding: theme.spacing(.2, 0, .2, .5),
        '&.error': {
            color: theme.palette.error.light,
            paddingRight: theme.spacing(.5)
        },
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    noSales: {
        color: theme.palette.error.light,
        margin: 0,
        fontSize: 14
    },
    soldOutLink: {
        color: theme.palette.primary.main,
        fontWeight: 600
    },
    lastPrice: {
        color: theme.palette.text.primary,
        paddingLeft: '4px'
    },
    lastPriceUp: {
        color: theme.palette.success.light
    },
    lastPriceDown: {
        color: theme.palette.warning.main
    },
    listingsLoader: {
        width: 70,
        height: 27
    }
}));

export const bodyStyles = makeStyles(theme => createStyles({
    body: {
        margin: theme.spacing(.2, '3%'),
        position: 'relative',
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

export const imageStyles = makeStyles(theme => createStyles({
    imageWrapper: {
        paddingBottom: '50%',
        width: '65%',
        margin: theme.spacing(3, 'auto', 1),
        position: 'relative'
    },
    image: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
}));

export const nameStyles = makeStyles(theme => createStyles({
    name: {
        fontWeight: 500,
        lineHeight: 1.4,
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    }
}));

export const statsStyles = makeStyles(theme => createStyles({
    stats: {
        color: theme.palette.common.white,
        fontSize: 16,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    stat: {
        margin: '0 2px',
        display: 'flex',
        alignItems: 'center'
    }
}));

export const slotStyles = makeStyles(theme => createStyles({
    slot: {
        position: 'absolute',
        top: 0,
        right: 0,
        minWidth: 34,
        color: theme.palette.common.white,
        opacity: .2,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        transition: 'opacity .2s ease-in-out',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    }
}));
