import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    button: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2,
        '&.opened': {
            '& $buttonInner': {
                background: theme.palette.primary.dark
            },
            '& $buttonDropdown': {
                display: 'block'
            }
        }
    },
    buttonInner: {
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.primary.main,
        padding: 2,
        borderRadius: 4,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background .2s ease-in-out',
        '&:hover': {
            background: theme.palette.primary.dark
        }
    },
    caption: {
        color: theme.palette.background.default,
        padding: '6px 8px',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase'
    },
    captionText: {
        fontSize: '15px !important',
        fontWeight: '600 !important',
        margin: 0
    },
    address: {
        background: theme.palette.background.default,
        padding: '6px 8px',
        borderRadius: 4,
    },
    buttonDropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        background: theme.palette.background.paper,
        borderRadius: '4px 0 4px 4px',
        padding: 18,
        maxHeight: 300,
        width: 300,
        cursor: 'default',
        display: 'none'
    },
    dropdownDivider: {
        textAlign: 'center',
        margin: '8px 0 !important'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: theme.palette.background.paper,
        padding: 18,
        borderRadius: 4
    }
}));
