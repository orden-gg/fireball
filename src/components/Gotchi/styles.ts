import { alpha } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    gotchi: {
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        border: '3px solid gray',
        alignItem: 'space-between',
        '&:hover': {
            textDecoration: 'none',
            zIndex: 1
        },
        '&.haunt1': {
            backgroundColor: theme.palette.haunts.h1
        },
        '&.haunt2': {
            backgroundColor: theme.palette.haunts.h2
        },
        '&.narrowed': {
            background: 'none',
            border: 'none'
        },
        '&.vertical': {
            padding: '0 5px 5px'
        },
        '&.horizontal': {
            display: 'flex',
            flexDirection: 'unset',
            padding: theme.spacing(0, 1)
        },
        '&.common': {
            borderColor: theme.palette.rarity.common
        },
        '&.rare': {
            borderColor: theme.palette.rarity.rare
        },
        '&.mythical': {
            borderColor: theme.palette.rarity.mythical
        },
        '&.godlike': {
            borderColor: theme.palette.rarity.godlike
        },
        '&.lended': {
            overflow: 'hidden',
            '&:hover': {
                '& $statusBadge': {
                    opacity: 0
                }
            }
        }
    },
    statusBadge: {
        position: 'absolute',
        bottom: 15,
        right: -30,
        background: alpha(theme.palette.primary.main, .3),
        color: alpha(theme.palette.secondary.main, .8),
        fontWeight: 600,
        padding: 2,
        zIndex: 5,
        width: 120,
        transform: 'rotate(-45deg)',
        transformOrigin: 'center center',
        pointerEvents: 'none',
        transition: 'opacity .3s ease-in-out'
    },
    gotchiHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '.vertical &': {
            padding: '5px 3px',
            margin: '0 -5px',
            backgroundColor: alpha('#000', .2)
        },
        '.horizontal &': {
            position: 'absolute',
            top: theme.spacing(1),
            width: '100%'
        },
        '.narrowed &': {
            padding: 0
        }
    },
    gotchiInnerSection: {
        marginTop: 8
    },
    imageContainer: {
        position: 'relative'
    },
    rsContainer: {
        position: 'absolute',
        left: 0,
        top: 6,
        padding: '0 2px',
        zIndex: 1,
        display: 'flex',
        backgroundColor: alpha('#000', .5)
    },
    imageFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    // Horizontal
    gotchiImageCell: {
        minWidth: 250,
        maxWidth: 250,
        margin: theme.spacing(0, 1),
        position: 'relative'
    },
    gotchiTraitsCell: {
        margin: theme.spacing(3, 1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 320
    },
    gotchiPriceCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    },
    gotchiFlipContainer: {
        position: 'relative',
        margin: 'auto 0'
    },
    gotchiIsFlipped: {
        display: 'flex'
    },
    gotchiFlipBack: {
        display: 'none',
        '$gotchiIsFlipped &': {
            display: 'block'
        }
    },
    gotchiFlipFront: {
        '$gotchiIsFlipped &': {
            display: 'none'
        }
    }
}));
