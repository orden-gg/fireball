
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export default makeStyles((theme) => ({
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
    },
    gotchiSvg: {
        margin: '0 -8px',
        padding: 8
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
    },
    gotchiBadges: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 -4px',
        padding: '4px 0'

    },
    gotchiBadge: {
        height: 25,
        display: 'block',
        marginLeft: 6,
        '& img': {
            display: 'block'
        }
    },
    gotchiLvlTooltip: {
        '& p': {
            margin: 0
        },
        '& span': {
            color: theme.palette.primary.main
        }
    },
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
    gotchiName: {
        display: 'block',
        backgroundColor: alpha(theme.palette.secondary.dark, .3),
        color: `${theme.palette.text.primary} !important`,
        fontWeight: 'bold',
        padding: '8px',
        margin: '0 -8px !important',
        position: 'relative',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.secondary.dark, .6),
        },
        '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '16px !important',
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
    gotchiMainTraits: {
        margin: '8px 0'
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
        height: '100%'
    },
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: '12px !important'
    },
    tokenValue: {
        display: 'inline-flex',
        alignItems: 'center'
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
    customTooltip: {
        backgroundColor: `${theme.palette.secondary.dark} !important`,
        marginBottom: '8px !important'
    },
}));