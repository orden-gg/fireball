import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    gotchiSvg: {
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
        },
        '.horizontal &': {
            margin: '0 47px'
        },
    },
    svgWrapper: {
        position: 'relative',
        zIndex: 1,
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
    gotchiSvgPortal: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        opacity: .5
    },
    svgPlaceholder: {
        width: '100%'
    },
    gotchiHaunt: {
        color: '#000',
        textTransform: 'uppercase',
        position: 'absolute',
        right: 5,
        top: 5
    },
    whitelist: {
        background: alpha('#000', .3),
        borderRadius: 2,
        padding: '2px 4px',
        position: 'absolute',
        bottom: 8,
        right: 8,
        fontWeight: 'bold',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center'
    },
    guild: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        zIndex: 5,
    },
    guildAvatar: {
        width: 32,
        height: 32,
        border: '2px solid #fff'
    },
}));

export default styles;
