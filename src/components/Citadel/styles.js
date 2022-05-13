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
        width: 1,
        zIndex: 1
    },
    citadelInterfaceButton: {
        margin: theme.spacing(.2, 0),
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    citadelSearch: {
        display: 'flex',
        alignItems: 'center'
    },
    citadelSearchField: {
        width: 150,
        '& .MuiInput-input': {
            textAlign: 'right',
            fontSize: 14
        }
    },
    interfaceDivider: {
        width: 40,
        backgroundColor: alpha('#fff', .3)
    }
}));

const ParcelBoxStyle = makeStyles(theme => ({
    parcel: {
        position: 'absolute',
        minWidth: 220,
        maxWidth: 260,
        left: theme.spacing(2),
        bottom: theme.spacing(2),
        background: theme.palette.background.paper,
    },
    closeParcel: {
        position: 'absolute',
        left: '100%',
        top: 0,
        marginLeft: theme.spacing(.5),
        width: 30,
        height: 30
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
}))

export {
    styles as default,
    LoaderStyles,
    ParcelBoxStyle,
    InterfaceStyles
}
