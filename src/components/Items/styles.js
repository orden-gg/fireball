import { alpha } from '@mui/system';

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
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
        marginLeft: 4,
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
    itemBalanceDivider: {
        margin: '0 2px'
    }
}));

const itemStyles = makeStyles( theme => ({
    item: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '32px 12px 36px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
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
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .15)
        },
        '&:hover .labelSlot': {
            opacity: .7,
        }
    },
    portalCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            minHeight: '30%'
        }
    },
    parcelCard: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '& canvas': {
            maxWidth: 100,
            maxHeight: 100
        }
    }
}));

const tooltipStyles = makeStyles( theme => ({

    tooltip: {
        padding: '16px 12px 12px',
        backgroundColor: 'transparent',
    },

    customTooltip: {
        backgroundColor: `${theme.palette.secondary.dark}`,
        marginBottom: 8
    },

    labels: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        '& div:last-child': {
            borderTopRightRadius: 4
        },
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        justifyContent: 'center',
        border: '3px solid transparent',
        '& h6': {
            fontWeight: '600'
        },
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
        },
    },
    labelTotal: {
        backgroundColor: theme.palette.primary.main,
        borderColor: alpha(theme.palette.secondary.dark, .5),
        padding: '0 0 0 4px',
        '&.baazarPrice': {
            backgroundColor: alpha(theme.palette.secondary.dark, .4),
            borderColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            }
        },
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
        }
    },
    labelBalance: {
        backgroundColor: alpha(theme.palette.secondary.dark, .8),
        minWidth: 34,
    },
    labelListing: {
        color: theme.palette.error.main,
        padding: '0 4px'
    }
}));

const ERC1155InnerStyles = makeStyles( theme => ({
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65%',
        marginBottom: 4,
        
        '.tooltip-wearable &': { // iconWrapper
            minHeight: 60
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
    },
    stats: {
        fontWeight: '500',
        
        '.tooltip-wearable &': { // stats
            fontSize: 13
        }
    },
}));

const parselStyles = makeStyles( theme => ({
    boosts: {
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
    },

    boost: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        color: theme.palette.secondary.main,
        fontSize: 14,
        fontWeight: 600,
        '& img': {
            marginRight: 2
        },

        '&.fud': {
            backgroundColor: theme.palette.alchemica.fud
        },

        '&.fomo': {
            backgroundColor: theme.palette.alchemica.fomo
        },

        '&.alpha': {
            backgroundColor: theme.palette.alchemica.alpha
        },

        '&.kek': {
            backgroundColor: theme.palette.alchemica.kek
        }
    },

    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 14,
        color: '#fff'
    },
    labelParselPrice: {
        color: theme.palette.secondary.main,

        '.humble &': {
            backgroundColor: theme.palette.realm.humble
        },

        '.resonable &': {
            backgroundColor: theme.palette.realm.resonable
        },

        '.specions &': {
            backgroundColor: theme.palette.realm.specions
        }
    }
}));

const portalStyles = makeStyles( theme => ({
    portalImage: {
        width: 100,
        marginTop: 10
    }
}));

export {
    styles as default,
    itemStyles,
    ERC1155InnerStyles,
    tooltipStyles,
    parselStyles,
    portalStyles
}