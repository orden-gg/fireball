import { alpha } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const styles = makeStyles(theme => createStyles({
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
    priceLoader: {
        width: 70,
        height: 27,
        marginLeft: 4
    },
    totalValueLoader: {
        width: 70,
        height: 27
    },
    prices: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& div:last-child': {
            borderBottomRightRadius: 4
        },
        '.craft-item &': {
            display: 'none'
        }
    },
    equippedTitle: {
        maxWidth: 200
    },
    equippedTitleText: {
        margin: '0 0 2px'
    },
    equippedTitleLink: {
        color: theme.palette.primary.main,
        fontWeight: 600
    },
    itemBalancxeDivider: {
        margin: '0 2px'
    },
    // horizontal
    horizontalCard: {
        display: 'flex',
        minHeight: 200,
        padding: theme.spacing(0, 1),
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1)
        },
        '&.drop': {
            backgroundColor: alpha(theme.palette.rarity.drop, .1)
        },
        '&.humble': {
            backgroundColor: alpha(theme.palette.realm.humble, .15)
        },
        '&.reasonable': {
            backgroundColor: alpha(theme.palette.realm.reasonable, .15)
        },
        '&.spacious': {
            backgroundColor: alpha(theme.palette.realm.spacious, .15)
        },
        '&.golden': {
            backgroundColor: alpha(theme.palette.rarity.golden, .15)
        },
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .15)
        },
        '&.haunt1': {
            backgroundColor: alpha(theme.palette.haunts.h1, .15)
        },
        '&.haunt2': {
            backgroundColor: alpha(theme.palette.haunts.h2, .15)
        },
        '&:hover .labelSlot': {
            opacity: .7
        }
    },
    wearableImageCell: {
        margin: theme.spacing(0, 1),
        maxWidth: 250,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        '.common &': {
            backgroundColor: alpha(theme.palette.rarity.common, .15)
        },
        '.uncommon &': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .15)
        },
        '.rare &': {
            backgroundColor: alpha(theme.palette.rarity.rare, .15)
        },
        '.legendary &': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .15)
        },
        '.mythical &': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .15)
        }
    },
    wearableStatsCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: theme.spacing(2, 1),
        width: 320
    },
    wearablePriceCell: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    },
    portalImageCell: {
        margin: theme.spacing(0, 1),
        maxWidth: 250,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        '.haunt1 &': {
            backgroundColor: alpha(theme.palette.haunts.h1, .15)
        },
        '.haunt2 &': {
            backgroundColor: alpha(theme.palette.haunts.h2, .15)
        }
    },
    portalInfoCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: theme.spacing(2, 1),
        width: 320
    },
    portalPriceCell: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    },
    ticketImageCell: {
        margin: theme.spacing(0, 1),
        maxWidth: 250,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        '.common &': {
            backgroundColor: alpha(theme.palette.rarity.common, .15)
        },
        '.uncommon &': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .15)
        },
        '.rare &': {
            backgroundColor: alpha(theme.palette.rarity.rare, .15)
        },
        '.legendary &': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .15)
        },
        '.mythical &': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .15)
        },
        '.godlike &': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .15)
        },
        '.drop &': {
            backgroundColor: alpha(theme.palette.rarity.drop, .05)
        }
    },
    ticketInfoCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: theme.spacing(2, 1),
        width: 320
    },
    ticketPriceCell: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    }
}));

export const itemStyles = makeStyles(theme => createStyles({
    item: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '32px 12px 36px',
        textAlign: 'center',
        minHeight: '100%',
        position: 'relative',
        transition: 'background-color .3s ease-in-out',
        overflow: 'hidden',
        '.craft-item &': {
            maxHeight: '100%',
            [theme.breakpoints.down('lg')]: {
                padding: theme.spacing(2, 1)
            }
        },
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1)
        },
        '&.drop': {
            backgroundColor: alpha(theme.palette.rarity.drop, .1)
        },
        '&.humble': {
            backgroundColor: alpha(theme.palette.realm.humble, .15),
            borderColor: theme.palette.realm.humble,
            '&:hover': {
                backgroundColor: alpha(theme.palette.realm.humble, .2)
            }
        },
        '&.reasonable': {
            backgroundColor: alpha(theme.palette.realm.reasonable, .15),
            borderColor: theme.palette.realm.reasonable,
            '&:hover': {
                backgroundColor: alpha(theme.palette.realm.reasonable, .2)
            }
        },
        '&.spacious': {
            backgroundColor: alpha(theme.palette.realm.spacious, .15),
            borderColor: theme.palette.realm.spacious,
            '&:hover': {
                backgroundColor: alpha(theme.palette.realm.spacious, .2)
            }
        },
        '&.golden': {
            backgroundColor: alpha(theme.palette.rarity.golden, .15)
        },
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .15),
            borderColor: theme.palette.realm.partner,
            '&:hover': {
                backgroundColor: alpha(theme.palette.realm.partner, .2)
            }
        },
        '&.realm-generic': {
            backgroundColor: alpha('#c1a415', 0.15)
        },
        '&:hover .labelSlot': {
            opacity: .7
        }
    },
    portalCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 5px 5px',
        '& img': {
            minHeight: '30%'
        }
    },
    parcelCard: {
        padding: '0 0 28px',
        cursor: 'pointer',
        border: '3px solid transparent',
        borderRadius: 0,
        '&:hover $parcelImageWrapper': {
            opacity: 1,
            '& canvas': {
                transform: 'scale(1.2)'
            }
        }
    },
    parcelName: {
        fontSize: 16,
        textShadow: `1px 1px 0px ${alpha('#000', .3)}`,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        padding: '6px 0'
    },
    parcelImageWrapper: {
        opacity: .7,
        overflow: 'hidden',
        transition: 'opacity .3s ease-in-out',
        '& > div': {
            transition: 'all .3s ease-in-out'
        }
    },
    parcelSize: {
        position: 'absolute',
        top: 3,
        left: 8,
        zIndex: 1,
        '& span': {
            fontSize: 12
        }
    },
    itemBalanceDivider: {
        margin: '0 2px'
    },
    idHash: {
        fontWeight: 600,
        padding: '0 4px !important'
    }
}));

export const tooltipStyles = makeStyles(theme => createStyles({
    tooltip: {
        padding: '16px 12px 12px',
        backgroundColor: 'transparent'
    },
    customTooltip: {
        backgroundColor: `${theme.palette.secondary.dark}`,
        marginBottom: 8
    },
    labels: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        display: 'flex'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        justifyContent: 'center',
        border: '3px solid transparent',
        '& h6': {
            fontWeight: '600'
        }
    },
    labelSlot: {
        position: 'absolute',
        top: 27,
        right: 0,
        minWidth: 34,
        opacity: .2,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        transition: 'opacity .2s ease-in-out',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px',
                    ${theme.palette.secondary.main} -1px -1px 0px',
                    ${theme.palette.secondary.main} 1px -1px 0px',
                    ${theme.palette.secondary.main} -1px 1px 0px',
                    ${theme.palette.secondary.main} 1px 1px 0px`,
        '.tooltip-wearable &': { // labelSlot
            top: 0,
            opacity: .7
        }
    },
    labelTotal: {
        backgroundColor: theme.palette.primary.main,
        borderColor: alpha(theme.palette.secondary.dark, .5),
        padding: '0 0 0 4px',
        '&.baazarPrice': {
            backgroundColor: alpha(theme.palette.secondary.dark, .4),
            borderColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark
            }
        }
    },
    labelRarityColored: {
        '.common &': {
            backgroundColor: theme.palette.rarity.common,
            color: theme.palette.secondary.main
        },
        '.uncommon &': {
            backgroundColor: theme.palette.rarity.uncommon,
            color: theme.palette.secondary.main
        },
        '.rare &': {
            backgroundColor: theme.palette.rarity.rare,
            color: theme.palette.secondary.main
        },
        '.legendary &': {
            backgroundColor: theme.palette.rarity.legendary,
            color: theme.palette.secondary.main
        },
        '.mythical &': {
            backgroundColor: theme.palette.rarity.mythical,
            color: theme.palette.secondary.main
        },
        '.godlike &': {
            backgroundColor: theme.palette.rarity.godlike,
            color: theme.palette.secondary.main
        },
        '.drop &': {
            backgroundColor: theme.palette.customColors.lightGray,
            color: theme.palette.secondary.main
        },
        '.golden &': {
            backgroundColor: theme.palette.rarity.golden,
            color: theme.palette.secondary.main
        },
        '.humble &': {
            backgroundColor: lighten(theme.palette.realm.humble, .4),
            color: theme.palette.secondary.main
        },
        '.reasonable &': {
            backgroundColor: lighten(theme.palette.realm.reasonable, .4),
            color: theme.palette.secondary.main
        },
        '.spacious &': {
            backgroundColor: lighten(theme.palette.realm.spacious, .4),
            color: theme.palette.secondary.main
        },
        '.partner &': {
            backgroundColor: lighten(theme.palette.realm.partner, .4),
            color: theme.palette.secondary.main
        }
    },
    labelBalance: {
        backgroundColor: theme.palette.secondary.dark,
        minWidth: 34,
        fontWeight: 600
    },
    labelListing: {
        color: theme.palette.error.main,
        padding: '0 4px'
    }
}));

export const ERC1155InnerStyles = makeStyles(theme => createStyles({
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        marginBottom: 4,
        '.tooltip-wearable &': { // iconWrapper
            minHeight: 60
        },
        '.horizontal &': {
            width: 150,
            height: 150,
            margin: 'auto'
        }
    },
    icon: {
        width: '60%',
        maxHeight: 80,
        '.tooltip-wearable &': { // icon
            maxHeight: 50
        }
    },
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
        },
        '&.parcel-name': {
            marginTop: 8,
            cursor: 'pointer'
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
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
        '&.humble': {
            color: lighten(theme.palette.realm.humble, .3)
        },
        '&.reasonable': {
            color: lighten(theme.palette.realm.reasonable, .3)
        },
        '&.golden': {
            color: theme.palette.rarity.golden
        },
        '&.spacious': {
            color: lighten(theme.palette.realm.spacious, .3)
        },
        '&.partner': {
            color: theme.palette.realm.partner
        },
        '&.realm-generic': {
            color: '#c1a415'
        }
    },
    stats: {
        fontWeight: 500,
        '.tooltip-wearable &': { // stats
            fontSize: 13
        }
    }
}));

export const parselStyles = makeStyles(theme => createStyles({
    boosts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        marginTop: '-40px',
        position: 'relative',
        padding: '8px 0',
        transition: 'opacity .3s ease-in-out',
        zIndex: 3
    },
    boost: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        color: theme.palette.secondary.main,
        fontSize: 14,
        fontWeight: 600,
        borderRadius: 2,
        lineHeight: 1,
        border: '2px solid transparent',
        margin: '0 2px',
        '& img': {
            marginRight: 4
        },
        '&.fud': {
            backgroundColor: lighten(theme.palette.alchemica.fud, .3),
            borderColor: theme.palette.alchemica.fud
        },
        '&.fomo': {
            backgroundColor: lighten(theme.palette.alchemica.fomo, .3),
            borderColor: theme.palette.alchemica.fomo
        },
        '&.alpha': {
            backgroundColor: lighten(theme.palette.alchemica.alpha, .3),
            borderColor: theme.palette.alchemica.alpha
        },
        '&.kek': {
            backgroundColor: lighten(theme.palette.alchemica.kek, .3),
            borderColor: theme.palette.alchemica.kek
        }
    },
    parcelPriceContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0
    },
    parcelInstallations: {
        padding: '4px 8px 8px'
    },
    labelParselPrice: {
        color: theme.palette.secondary.main,
        '.humble &': {
            backgroundColor: theme.palette.realm.humble
        },
        '.reasonable &': {
            backgroundColor: theme.palette.realm.reasonable
        },
        '.spacious &': {
            backgroundColor: theme.palette.realm.spacious
        }
    },
    labelSlot: {
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: .5,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px',
                    ${theme.palette.secondary.main} -1px -1px 0px',
                    ${theme.palette.secondary.main} 1px -1px 0px',
                    ${theme.palette.secondary.main} -1px 1px 0px',
                    ${theme.palette.secondary.main} 1px 1px 0px`
    },
    shopParcelPrice: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    size: {
        position: 'absolute',
        right: 4,
        bottom: 4,
        fontSize: 10,
        opacity: .8
    }
}));

export const portalStyles = makeStyles(() => createStyles({
    portalImage: {
        width: 100,
        maxWidth: 100,
        marginTop: 10,
        '.horizontal &': {
            margin: 'auto'
        }
    },
    portalPriceContainer: {
        width: '100%'
    }
}));

export const channelingStyles = makeStyles(() => createStyles({
    container: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        background: alpha('#000', .2),
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        '& img': {
            display: 'block'
        }
    },
    unactiveIcon: {
        filter: 'grayscale(1)'
    },
    placeholder: {
        width: 28,
        height: 28,
        borderRadius: 4
    }
}));

export const installationStyles = makeStyles(theme => createStyles({
    level: {
        color: theme.palette.rarity.golden,
        background: alpha('#000', .1),
        padding: 4,
        borderRadius: 4,
        margin: '4px auto 0',
        width: '50%'
    }
}));
