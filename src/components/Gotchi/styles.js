import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
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
            backgroundColor: theme.palette.haunts.h1,
        },
        '&.haunt2': {
            backgroundColor: theme.palette.haunts.h2,
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
            padding: theme.spacing(0, 1)
        },
        '&.rare': {
            borderColor: theme.palette.rarity.rare
        },
        '&.mythical': {
            borderColor: theme.palette.rarity.mythical
        },
        '&.godlike': {
            borderColor: theme.palette.rarity.godlike
        }
    },
    gotchiBadges: {
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
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    },
    gotchiIsFlipped: {
        position: 'relative',
        margin: 'auto 0'
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

const CustomTooltipStyles = makeStyles(theme => ({
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
    CustomTooltipStyles
}
