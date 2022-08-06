import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {
        position: 'relative',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        background: alpha('#000', .2),
        borderRadius: '4px 4px 0 0'
    },
    inner: {
        display: 'flex',
        alignItems: 'center'
    },
    dropdownContainer: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2
    },
    filterButton: {
        marginLeft: 4,
        lineHeight: 1,
        padding: '9px 16px',
        background: alpha('#fff', .06),
        color: '#fff',
        '&:hover': {
            background: alpha('#fff', .12)
        },
        '&.active': {
            background: alpha(theme.palette.primary.main, .8),
            color: '#000',
            borderRadius: '4px 4px 0 0'
        }
    },
    filtersCount: {
        position: 'absolute',
        top: -2,
        right: -4,
        width: 14,
        height: 14,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 2,
        lineHeight: 1,
        color: '#000',
        background: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filtersDropdown: {
        position: 'absolute',
        top: 36,
        left: 12,
        minWidth: 350,
        maxWidth: 500,
        background: theme.palette.background.paper,
        borderRadius: '0 4px 4px 4px',
        cursor: 'default',
        display: 'none',
        '.opened &': {
            display: 'block'
        }
    },
    filterBackdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
    buttonsWrapper: {
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between'
    },
    results: {
        marginLeft: 'auto',
        paddingRight: 8,
        fontWeight: 'bold'
    },
    placeholder: {
        marginLeft: 4,
        '& img': {
            display: 'block'
        }
    }
}));
