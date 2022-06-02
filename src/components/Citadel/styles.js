import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const keyframes = {
    drop: {
        '100%': {
            top: '100%'
        }
    }
};

const styles = makeStyles(theme => ({
    citadel: {
        position: 'absolute',
        '& canvas': {
            display: 'block'
        }
    }
}));

const InterfaceStyles = makeStyles(theme => ({
    citadelInterface: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(11),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: 1
    },
    citadelInterfaceButton: {
        margin: theme.spacing(.2, 0),
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, .3)
        },
        '&.active': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.secondary.main, .7)
        }
    },
    citadelFullscreen: {
        position: 'absolute',
        right: theme.spacing(1),
        bottom: theme.spacing(.8)
    },
    citadelSearch: {
        display: 'flex',
        alignItems: 'center'
    },
    citadelSearchField: {
        width: 150,
        '& .MuiInput-input': {
            textAlign: 'right',
            fontSize: 12
        }
    },
    interfaceDivider: {
        width: 40,
        backgroundColor: alpha('#fff', .3)
    }
}));

const LoaderStyles = makeStyles(theme => ({
    citadelLoading: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        background: '#110121',
        transition: '.2s linear',
        zIndex: 1,
        '&.is-loaded': {
            opacity: 0,
            visibility: 'hidden'
        }
    },
    citadelLoadingLine: {
        width: 1,
        position: 'relative',
        overflow: 'hidden',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            height: '15%',
            width: '100%',
            top: '-50%',
            left: 0,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #fff 75%, #bef3f5 100%)',
            animation: '7s cubic-bezier(0.4, 0.26, 0, 0.97) 0s infinite $drop',
            willChange: 'top'
        },
        '&:nth-of-type(1)': {

            '&:after': {
                animationDelay: '2.5s'
            }
        },
        '&:nth-of-type(3)': {
            '&:after': {
                animationDelay: '2s'
            }
        }
    },
    citadelLoadingInner: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 134,
        height: 124
    },
    citadelLoadingIcon: {
        width: '100%',
        height: '100%'
    },
    '@keyframes drop': keyframes.drop
}));

const InfoStyles = makeStyles(theme => ({
    infoContainer: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: 0
    },
    infoItem: {
        fontSize: 11,
        margin: theme.spacing(.5, 0),
        opacity: .8
    },
    infoButton: {
        padding: 4,
        borderRadius: 4,
        display: 'inline-block',
        backgroundColor: theme.palette.background.default
    }
}));

const FilterStyles = makeStyles(theme => ({
    dropdownContainer: {
        position: 'absolute',
        left: theme.spacing(1),
        top: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    filterButton: {
        lineHeight: 1,
        padding: '9px 16px',
        background: alpha('#fff', .06),
        color: '#fff',
        '&:hover': {
            background: alpha('#fff', .12),
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
        top: '100%',
        left: 0,
        width: 320,
        background: theme.palette.background.paper,
        borderRadius: '0 4px 4px 4px',
        cursor: 'default',
        overflow: 'hidden',
        display: 'none',
        '.opened &': {
            display: 'block'
        }
    },
    filterBackdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
    buttonsWrapper: {
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

export {
    styles as default,
    LoaderStyles,
    InterfaceStyles,
    InfoStyles,
    FilterStyles
}
