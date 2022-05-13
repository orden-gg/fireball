import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        position: 'relative',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        background: alpha('#000', .15),
        borderRadius: '4px 4px 0 0'
    },
    inner: {
        display: 'flex',
        alignItems: 'center'
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2
    },
    filterButton: {
        marginLeft: 8,
        lineHeight: 1.5
    },
    filtersCount: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 18,
        border: '2px solid #fd9af9',
        height: 18,
        fontSize: 10,
        borderRadius: '50%',
        textAlign: 'center',
        color: '#fd9af9',
        background: '#000'
    },
    filtersDropdown: {
        position: 'absolute',
        left: 8,
        minWidth: 350,
        maxWidth: 500,
        background: theme.palette.background.paper,
        borderRadius: '4px 0 4px 4px',
        cursor: 'default',
        overflow: 'hidden',
        display: 'none',

        '.opened &': {
            display: 'block'
        }
    },
    filtersWrapper: {
        padding: 12,
    },
    filterBackdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 12
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

export default styles;
