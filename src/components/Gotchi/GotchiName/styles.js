import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    gotchiName: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: alpha(theme.palette.secondary.dark, .3),
        color: theme.palette.text.primary,
        fontWeight: '500',
        position: 'relative',
        transition: 'all .2s ease-in-out',
        padding: 7,
        fontSize: 15,
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.secondary.dark, .6)
        },
        '.team &': {
            textShadow: '0 0 2px #000',
            '&:hover p': {
                overflow: 'visible'
            }
        },
        '.narrowed &': {
            background: 'none',
            padding: 5,
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            margin: 0,
            '.narrowed &': {
                fontSize: 14
            }
        }
    },
    gotchiId: {
        color: '#00FFFF',

        '.team &': {
            display: 'none'
        }
    },
    callMadeIcon: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 12,
        '.narrowed &': {
            bottom: 8
        }
    }
}));

export default styles;
