import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const styles = makeStyles(theme => createStyles({
    linkName: {
        display: 'block',
        backgroundColor: alpha(theme.palette.secondary.dark, .3),
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        padding: 8,
        margin: '0 -8px',
        position: 'relative',
        transition: 'all .2s ease-in-out',
        textAlign: 'center',
        '.horizontal &': {
            margin: 0
        },
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.secondary.dark, .6)
        },
        '.narrowed &': {
            background: 'none',
            padding: '5px 10px 5px 5px'
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
                    textDecoration: 'underline'
                }
            }
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
