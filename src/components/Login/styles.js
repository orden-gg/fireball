import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export default makeStyles((theme) => ({
    button: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2,
        '&.opened': {
            '& $buttonInner': {
                background: theme.palette.primary.dark,
                borderRadius: '4px 4px 0 0',
            },
            '& $buttonDropdown': {
                display: 'block'
            }
        }
    },
    buttonInner: {
        height: 36,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.background.default,
        padding: '0 6px',
        minWidth: 36,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase'
    },
    captionText: {
        fontSize: '15px !important',
        fontWeight: '600 !important',
        margin: 0
    },
    address: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        padding: '0 8px',
        height: '100%',
        borderRadius: 4,
    },
    buttonDropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        background: theme.palette.background.paper,
        borderRadius: '4px 0 4px 4px',
        padding: 18,
        width: 350,
        cursor: 'default',
        overflow: 'hidden',
        display: 'none'
    },
    dropdownDivider: {
        textAlign: 'center',
        margin: '0 8px !important'
    },
    customButton: {
        backgroundColor: `${alpha(theme.palette.primary.main, .08)} !important`,
        maxWidth: '50%',
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, .16)} !important`,
        }
    },
    listItem: {
        backgroundColor: alpha(theme.palette.background.default, .4),
        border: '2px solid transparent',
        padding: '0 12px',
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        '&.active': {
            backgroundColor: alpha(theme.palette.primary.main, .05),
            borderColor: alpha(theme.palette.primary.main, .3)
        },
        '& + $listItem': {
            marginTop: 2
        }
    },
    listWrapper: {
        maxHeight: 275,
        overflowY: 'scroll',
        // borderBottom: `2px solid ${theme.palette.primary.dark}`,
    },
    listItemName: {
        fontSize: '16px !important',
        fontWeight: '500 !important',
        '&.Mui-disabled::before': {
            borderColor: 'transparent !important'
        },
        '& input': {
            color: `${theme.palette.common.white} !important`,
            cursor: 'pointer !important',
            textFillColor: `${theme.palette.common.white} !important`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    },
    tooltip: {
        background: 'red'
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
    },
    modalTitle: {
        marginBottom: '24px !important'
    }
}));
