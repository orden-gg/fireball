
import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    gotchi: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        padding: '24px 12px 16px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&:hover': {
            textDecoration: 'none'
        },
    },
    gotchiSvg: {
        width: 120,
        margin: 'auto',
        '& .gotchi-wearable': {
            transition: 'all .5s ease-in-out'
        },
        '& .gotchi-sleeves': {
            transition: 'all .5s ease-in-out'
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
    gotchiInnerSection: {
        marginTop: 8
    },
    gotchiCaption: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 'bold',
        padding: '0 4px',
        position: 'absolute',
        top: 0,
        right: '50%',
        minWidth: 60,
        margin: 0,
        transform: 'translate(50%, -50%)',
        opacity: .8
    },
    gotchiLvlWrapper: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    gotchiLvl: {
        display: 'inline-flex',
        position: 'relative',
        backgroundColor: fade(theme.palette.primary.main, .1),
        borderRadius: '50%',
        cursor: 'default',
        '&:hover .popover-core': {
            opacity: 1
        }
    },
    gotchiLvlInner: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: 0
    },
    gotchiLvlNumber: {
        color: theme.palette.primary.main,
        fontWeight: 500,
    },
    gotchiLvlPopover: {
        borderRadius: theme.shape.borderRadius,
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: '4px 8px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        textAlign: 'left',
        transition: 'opacity .3s ease-in-out',
        opacity: 0,
        '& p': {
            fontWeight: 500,
            color: theme.palette.secondary.main,
            margin: 0
        }
    },
    gotchiName: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 'bold',
        padding: '2px 4px',
        margin: '8px 0',
        position: 'relative',
        textDecoration: 'none',
        opacity: .9,
        '&:hover': {
            textDecoration: 'none',
            opacity: 1
        },
        '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 15,
            margin: 0
        }
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
    gotchiWLineWrapper: {
        height: 16,
        display: 'flex',
        alignItems: 'center'
    },
    gotchiWLineItem: {
        flexGrow: 1,
        flexBasis: 0,
        maxWidth: '100%',
        backgroundColor: '#e3e3e3',
        height: 8,
        position: 'relative',
        margin: '0 0.5px',
        transition: 'all .1s ease-in-out',
        '&:first-child': {
            borderTopLeftRadius: theme.shape.borderRadiusSmaller,
            borderBottomLeftRadius: theme.shape.borderRadiusSmaller
        },
        '&:last-child': {
            borderTopRightRadius: theme.shape.borderRadiusSmaller,
            borderBottomRightRadius: theme.shape.borderRadiusSmaller
        },
        '&:hover': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            height: 16,
            flexBasis: '25%',
            '& .popover-core': {
                opacity: 1,
                pointerEvents: 'all'
            },
            '& .name': {
                opacity: '1 !important'
            }
        }
    },
    gotchiWLinePopover: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: theme.shape.borderRadiusSmaller,
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        opacity: 0,
        padding: 4,
        pointerEvents: 'none',
        height: 65,
        width: 65,
        textDecoration: 'none',
        transform: 'translateX(-50%)',
        transition: 'opacity .2s ease-in-out'
    },
    gotchiWLinePopoverName: {
        position: 'absolute',
        right: 0,
        bottom: -1,
        left: 0,
        pointerEvents: 'none',
        fontSize: 13,
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
        whiteSpace: 'nowrap',
        opacity: 0,
        margin: 0,
        transition: 'opacity .2s ease-in-out'
    },
    gotchiWLinePopoverEmpty: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
        margin: 0
    },
    gotchiWLineLink: {
        display: 'block',
        height: '100%',
        textDecoration: 'none !important',
    },
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 12
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    mainVal: {
        fontSize: 13,
        fontWeight: 500,
        margin: 0,
        padding: '1px 0',
        whiteSpace: 'nowrap'
    },
    defaultVal: {
        fontSize: 10,
        marginLeft: 2
    }
}));