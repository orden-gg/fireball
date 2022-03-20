
import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

const styles = makeStyles( theme => ({
    gotchi: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        padding: '0 8px 8px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&:hover': {
            textDecoration: 'none'
        },

        '&.haunt1': {
            backgroundColor: alpha(theme.palette.haunts.h1, .2),
        },

        '&.haunt2': {
            backgroundColor: alpha(theme.palette.haunts.h2, .2),
        },

        '&.narrowed': {
            background: 'none'
        }
    },
    gotchiSvg: {
        margin: '0 -8px',
        padding: 8,
        position: 'relative',

        '.haunt1 &': {
            backgroundColor: alpha(theme.palette.haunts.h1, .15)
        },

        '.haunt2 &': {
            backgroundColor: alpha(theme.palette.haunts.h2, .15)
        },

        '.narrowed &': {
            padding: 0,
            marginTop: 5
        }
    },
    gotchiSvgPortal: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        opacity: .5
    },
    gotchiSvgInner: {
        position: 'relative',
        zIndex: 1
    },
    gotchiSetName: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
        pointerEvents: 'none'
    },
    gotchiInnerSection: {
        marginTop: 8
    },
    gotchiId: {
        backgroundColor: alpha(theme.palette.secondary.dark, .1),
        border: `3px solid ${alpha(theme.palette.secondary.dark, .3)}`,
        fontSize: 13,
        fontWeight: '700',
        minWidth: 70,
        opacity: .8,
        marginRight: 'auto',

        '.narrowed &': {
            minWidth: 50,
            backgroundColor: theme.palette.primary.main
        }
    },
    gotchiBadges: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 -4px',
        padding: '4px 0',

        '.narrowed &': {
            padding: 0
        }

    },
    gotchiBadge: {
        height: 25,
        display: 'block',
        marginLeft: 6,
        '& img': {
            display: 'block'
        }
    },
    gotchiName: {
        display: 'block',
        backgroundColor: alpha(theme.palette.secondary.dark, .3),
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        padding: 8,
        margin: '0 -8px',
        position: 'relative',
        transition: 'all .2s ease-in-out',

        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.secondary.dark, .6),
        },

        '.narrowed &': {
            background: 'none',
            padding: '5px 10px 5px 5px',
        },

        '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 16,
            margin: 0,

            '.narrowed &': {
                fontSize: 14,

                '&:hover': {
                    textDecoration: 'underline',
                }
            }
        }
    },
    owner: {
        '&:hover': {
            textDecoration: 'underline'
        },
        '$gotchiBadges &': {
            marginRight: 'auto'
        },
        '.narrowed &': {
            fontSize: 12
        }
    },
    gotchiMainTraits: {
        margin: '8px 0'
    },
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 12,

        '.narrowed &': {
            bottom: 8
        }
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    rankBox: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    rankStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 8px',
        position: 'relative',
        bgcolor: alpha(theme.palette.secondary.dark, .5)
    },
    rankReward: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 6
    },
    rankStatusText: {
        color: theme.palette.warning.main,
        fontSize: 14,
        fontWeight: 600
    },
    rankRewardAmount: {
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'2px 2px 2px 8px',
        position:'relative',
        backgroundColor: alpha(theme.palette.primary.main, .2),
        fontSize: 12,
        textShadow: `1px 1px 0 ${alpha(theme.palette.secondary.main, .8)}`
    },
    rankRewardAmountNumber: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.43,
        margin: '0 2px'
    },
    mainVal: {
        fontSize: 13,
        fontWeight: 600,
        margin: 0,
        padding: '1px 0',
        whiteSpace: 'nowrap'
    },
    defaultVal: {
        fontSize: 10,
        marginLeft: 2
    },
    gotchiTraits: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 26
    },

    gotchiTraitsInner: {
        textAlign: 'center',
        flexBasis: '49%',
        margin: '2px 0'
    },

}));

const GotchiLevelStyles = makeStyles( theme => ({
    gotchiLvl: {
        display: 'inline-flex',
        position: 'relative',
        backgroundColor: alpha(theme.palette.primary.main, .1),
        borderRadius: '50%',
    },
    gotchiLvlNumber: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: 0,
        fontSize: 14,
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
}));

const GotchiSvgStyles = makeStyles( theme => ({
    svgWrapper: {
        margin: 'auto',
        '& svg, & img': {
            display: 'block'
        },
        '& .gotchi-wearable': {
            transition: 'all .5s ease-in-out'
        },
        '& .gotchi-sleeves': {
            transition: 'all .5s ease-in-out'
        },
        '&.hide-wearables .gotchi-wearable:not(.wearable-bg), &.hide-wearables .gotchi-sleeves': {
            display: 'none'
        },
        '&.hide-bg .gotchi-wearable.wearable-bg': {
            display: 'none'
        },
        '&:hover': {
            '& .gotchi-wearable:not(.wearable-bg)': {
                opacity: 0,
            },
            '& .gotchi-sleeves': {
                opacity: 0,
            },
            '& .wearable-head': {
                transform: 'translateY(-5px) rotateZ(-45deg)'
            },
            '& .wearable-eyes': {
                transform: 'translateX(10px) rotateZ(5deg)'
            },
            '& .wearable-face': {
                transform: 'translateX(-10px) rotateZ(10deg)'
            },
            '& .wearable-body': {
                transform: 'translateY(10px) rotateZ(-5deg)'
            },
            '& .wearable-hand-right': {
                transform: 'translateX(5px) rotateZ(-5deg)'
            },
            '& .wearable-hand-left': {
                transform: 'translateX(-5px) rotateZ(5deg)'
            },
            '& .wearable-pet': {
                transform: 'translateY(5px)'
            }
        }
    },
    svgPlaceholder: {
        width: '100%'
    }
}));

const GotchiWareableLineStyles = makeStyles( theme => ({

    gotchiWLineWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '12px 0 4px',
        '&:hover > div:not(:hover)': {
            opacity: .25
        }
    },

    gotchiWLineItem: {
        cursor: 'pointer',
        flexGrow: 1,
        flexBasis: 0,
        maxWidth: '100%',
        backgroundColor: '#e3e3e3',
        height: 8,
        position: 'relative',
        margin: '0 0.5px',
        transition: 'all .2s ease-in-out',
        '&:first-child': {
            borderTopLeftRadius: theme.shape.borderRadiusSmaller,
            borderBottomLeftRadius: theme.shape.borderRadiusSmaller
        },
        '&:last-child': {
            borderTopRightRadius: theme.shape.borderRadiusSmaller,
            borderBottomRightRadius: theme.shape.borderRadiusSmaller
        },
    },

    gotchiWTooltipTitle: {
        width: 150,
        height: 150,
        margin: '-4px -8px'
    },

    gotchiWTooltipName: {
        color: theme.palette.primary.main,
        marginRight: 4
    },

    gotchiLvl: {
        display: 'inline-flex',
        position: 'relative',
        backgroundColor: alpha(theme.palette.primary.main, .1),
        borderRadius: '50%',
    }
}));

const GotchiTraitsStyles = makeStyles( theme => ({
    gotchiTraits: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 26
    },
    gotchiTraitsInner: {
        textAlign: 'center',
        flexBasis: '49%',
        margin: '2px 0'
    },
    mainVal: {
        fontSize: 13,
        fontWeight: 600,
        margin: 0,
        padding: '1px 0',
        whiteSpace: 'nowrap'
    },
    defaultVal: {
        fontSize: 10,
        marginLeft: 2
    },
}));

const GotchiSkillpointsStyles = makeStyles( theme => ({
    skillpoints: {
        fontSize: 12,
        fontWeight: 700,
        padding: '3px 6px',
        marginRight: 6,
        borderRadius: 4,
        background: alpha(theme.palette.secondary.main, .2),
        color: alpha(theme.palette.common.white, .8)
    }
}));

const GotchiListingStyles = makeStyles( theme => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    listing: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
        position: 'relative',
        bottom: -8,
        right: -8,
        backgroundColor: alpha(theme.palette.secondary.dark, .5),
        fontSize: 14,
        fontWeight: 600,

        '& p': {
            margin: 0
        },

        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.dark, .7),
        }
    },
    listingShadow: {
        display: 'flex',
        alignItems: 'center',
        filter: 'grayscale(1)',
        color: alpha(theme.palette.common.white, .5),
    },
    listingLink: {
        display: 'flex',
        alignItems: 'center'
    },
    tooltipInner: {
        display: 'flex',
        justifyContent: 'center'
    },
    tooltipItem: {
        display: 'flex',
        alignItems: 'center'
    },
    tooltipDivider: {
        marginRight: 4,
        marginLeft: 2
    },
    lastPrice: {
        paddingLeft: 6
    },
    lastPriceUp: {
        color: theme.palette.success.light
    },
    lastPriceDown: {
        color: theme.palette.warning.main
    },
}));

const CustomTooltipStyles = makeStyles( theme => ({
    customTooltip: {
        backgroundColor: theme.palette.secondary.dark,
        marginBottom: 8,
        '& p': {
            margin: 0
        },
        '& span': {
            color: theme.palette.primary.main
        }
    },
}));

export {
    styles as default,
    GotchiLevelStyles,
    GotchiSvgStyles,
    GotchiWareableLineStyles,
    GotchiTraitsStyles,
    GotchiSkillpointsStyles,
    GotchiListingStyles,
    CustomTooltipStyles
 }
