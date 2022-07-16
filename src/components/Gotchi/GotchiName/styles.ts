import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    gotchiName: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: alpha(theme.palette.secondary.dark, .3),
        color: theme.palette.text.primary,
        fontWeight: 500,
        position: 'relative',
        transition: 'all .2s ease-in-out',
        padding: 7,
        fontSize: 15,
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.secondary.dark, .6)
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
        color: '#00FFFF'
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
