import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    loginNavigation: {
        display: 'flex',
        alignItems: 'flex-start',
        '& form': {
            flexGrow: 1
        }
    },
    button: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2,
    },
    buttonInner: {
        height: 34,
        display: 'flex',
        borderRadius: 4,
        cursor: 'pointer',
        position: 'relative',
    },
    caption: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.background.default,
        background: alpha(theme.palette.primary.main, 1),
        borderRadius: 4,
        padding: '0 8px',
        whiteSpace: 'nowrap',
        textTransform: 'lowercase',
        transition: 'background .2s ease-in-out',
        '&:hover': {
            background: alpha(theme.palette.primary.main, .7),
        },
    },
    captionText: {
        fontSize: 14,
        fontWeight: '600',
        margin: 0
    },
    address: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alpha('#000', .2),
        padding: '0 8px',
        borderRadius: 4,
        '&:hover': {
            background: alpha('#000', .3),
        },
    },
    addressText: {
        fontWeight: '700'
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
        display: 'none',

        '&.offset-top': {
            paddingTop: 57
        },

        '.opened &': {
            display: 'block'
        }
    },
    buttonIcon: {
        position: 'absolute',
        top: -6,
        right: -6,
        background: theme.palette.secondary.dark,
        padding: 2,
        borderRadius: '50%',
        '& img': {
            display: 'block'
        }
    },
    metamaskButton: {
        width: 40,
        minWidth: 40,
        marginLeft: 8
    },
    metamaskButtonIcon: {
        margin: '0 6px'
    },
    customButton: {
        backgroundColor: alpha(theme.palette.primary.main, .08),
        maxWidth: 160,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, .16),
        }
    },
    loginBackdrop: {
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: 'blur(3px)'
    },
    loginList: {
        maxHeight: 230,
        margin: '-12px -12px 12px -12px'
    },
    loginAddressBox: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
    },
    loginAddress: {
        backgroundColor: alpha(theme.palette.background.default, .6),
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px 6px 8px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        '&.active': {
            backgroundColor: alpha('#000', .3),
        },
        '&:first-of-type': {
            marginTop: 0
        }
    },
    loginAddressBody: {
        display: 'flex',
        alignItems: 'center',
    },
    loginAddressName: {
        fontSize: 16,
        fontWeight: '500',
        '&.Mui-disabled::before': {
            borderColor: 'transparent'
        },
        '& input': {
            color: `${theme.palette.common.white}`,
            cursor: 'pointer',
            textFillColor: `${theme.palette.common.white}`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '0 0 2px'
        },
        '&.metamask input': {
            textFillColor: 'orange'
        }
    },
    loginAddressAddress: {
        fontSize: '14px',
        fontWeight: '700',
        marginLeft: '4px',
        backgroundColor: theme.palette.background.paper,
        padding: '4px 6px',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, .4),
        }
    },
    loginAddressIcons: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 4
    },
    loginAddressForm: {
        display: 'flex',
        alignItems: 'center'
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
        marginBottom: 24
    },
    blockiesIcon: {
        marginRight: 8,
        borderRadius: 4,
    },
}));

export default styles
