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
        height: 38,
        display: 'flex',
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
        padding: '0 12px',
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
        borderRadius: '0 4px 4px 0',
    },
    addressText: {
        fontWeight: '700 !important'
    },
    buttonDropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        background: theme.palette.background.paper,
        borderRadius: '4px 0 4px 4px',
        padding: 12,
        width: 350,
        cursor: 'default',
        overflow: 'hidden',
        display: 'none'
    },
    dropdownDivider: {
        textAlign: 'center',
        margin: '0 8px !important'
    },
    metamaskButton: {
        maxWidth: 160,
    },
    customButton: {
        backgroundColor: `${alpha(theme.palette.primary.main, .08)} !important`,
        maxWidth: 160,
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, .16)} !important`,
        }
    },
    listWrapper: {
        maxHeight: 230
    },
    listItem: {
        backgroundColor: alpha(theme.palette.background.default, .6),
        border: '2px solid transparent',
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        padding: '11px 6px 10px',
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
            padding: '0 0 2px'
        }
    },
    listItemAddress: {
        fontSize: '14px !important',
        fontWeight: '700 !important',
        marginLeft: '4px !important',
        backgroundColor: theme.palette.background.paper,
        padding: '4px 6px',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, .4),
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
