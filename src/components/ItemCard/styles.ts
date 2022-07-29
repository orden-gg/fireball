import { createStyles, makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';
import { alpha } from '@mui/system';

export const styles = makeStyles(theme => createStyles({
    card: {
        display: 'flex',
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .15),
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .15),
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .15),
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .15),
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
            color: lighten(theme.palette.rarity.drop, .4)
        },
        '&.golden': {
            backgroundColor: alpha(theme.palette.rarity.golden, .15),
            color: theme.palette.rarity.golden
        },
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .15),
            color: theme.palette.realm.partner
        },
        '&.haunt1': {
            backgroundColor: alpha(theme.palette.haunts.h1, .15),
            color: lighten(theme.palette.haunts.h1, .2)
        },
        '&.haunt2': {
            backgroundColor: alpha(theme.palette.haunts.h2, .15),
            color: lighten(theme.palette.haunts.h2, .2)
        }
    },
    cardVertical: {
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 5,
        padding: theme.spacing(1),
        overflow: 'hidden'
    },
    cardHorizontal: {
        minHeight: 200,
        padding: theme.spacing(0, 1)
    }
}));

export const innerStyles = makeStyles(theme => createStyles({
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(-1, -1, 0, 0)
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(1, -1, -1, 0)
    },
    imageCell: {
        margin: theme.spacing(0, 1),
        maxWidth: 250,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: alpha(theme.palette.common.black, .05),
    },
    statsCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        margin: theme.spacing(2, 1),
        width: 320
    },
    priceCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
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
    }
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
        width: 60,
        height: 26,
        backgroundColor: 'currentcolor'
    }
}));

export const listingsStyles = makeStyles(theme => createStyles({
    listings: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        padding: theme.spacing(.2, .5),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    error: {
        color: theme.palette.error.light
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
    coin: {
        marginRight: theme.spacing(-.5)
    },
    listingsLoader: {
        width: 60,
        height: 25
    },
    tooltipTitle: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    tooltipInner: {
        display: 'flex',
        justifyContent: 'center'
    },
    tooltipItem: {
        display: 'flex',
        alignItems: 'center',
        '& + &:before': {
            content: '"->"',
            display: 'inline-block',
            margin: theme.spacing(0, .5, 0, .25),
            color: theme.palette.primary.main
        }
    },
    token: {
        margin: theme.spacing(0, .5)
    }
}));

export const bodyStyles = makeStyles(theme => createStyles({
    body: {
        margin: theme.spacing(.25, 0),
        position: 'relative',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

export const imageStyles = makeStyles(theme => createStyles({
    imageWrapper: {
        paddingBottom: '45%',
        width: '65%',
        margin: theme.spacing(1, 'auto', 1),
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
        textAlign: 'center',
        maxWidth: '100%',
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
        marginLeft: 'auto',
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
