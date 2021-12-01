import { alpha } from '@mui/system';

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    loginNavigation: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '&.connect': {
            justifyContent: 'space-between'
        }
    },
    button: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 2,
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
        },
        '.opened &': {
            background: theme.palette.primary.dark,
            borderRadius: '4px 4px 0 0'
        }
    },
    buttonIcon: {
        backgroundColor: theme.palette.secondary.main,
        width: 34,
        borderRadius: '4px 0 0 4px',
        marginRight: 2,
        display: 'flex',
        alignItems: 'center',
        padding: 2,

        '&.metamask': {
            justifyContent: 'center',
        },

        '&.gotchi': {
            
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
        fontSize: 15,
        fontWeight: '600',
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
            paddingTop: 74
        },
        
        '.opened &': {
            display: 'block'
        }
    },
    dropdownDivider: {
        textAlign: 'center',
        margin: '0 8px'
    },
    metamaskButton: {
        maxWidth: 160,
    },
    metamaskButtonIcon: {
        width: 20,
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
        border: '2px solid transparent',
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        padding: '11px 6px 10px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,

        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        '&.active': {
            backgroundColor: alpha(theme.palette.primary.main, .05),
            borderColor: alpha(theme.palette.primary.main, .3)
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
    loginAddressFormIcon: {
        marginRight: 4,
        height: 35,

        '&.gotchi': {
            padding: 0
        },
        '&.metamask': {
            padding: '0 4px',
            display: 'flex',
            alignItems: 'center'
        }
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
    }
}));

export default styles
