import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: theme.spacing(6, 2, 0),
        height: 'calc(100vh - 74px)',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            overflow: 'hidden',
        }
    },
    body: {
        flexGrow: 1,
        padding: theme.spacing(2),
        minHeight: 'auto',
        margin: theme.spacing(2, 0),
        [theme.breakpoints.down('md')]: {
            minWidth: '100%',
            transition: 'margin .3s ease-out',
        }
    },
    isSwiped: {
        [theme.breakpoints.down('md')]: {
            marginLeft: -274
        }
    },
    backdrop: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

const sidebarStyles = makeStyles(theme => ({
    sidebar: {
        width: 300,
        minWidth: 300,
        borderRadius: 5,
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2, 0, 2, 2),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('lg')]: {
            zIndex: 1,
            borderRadius: 0,
            width: 274,
            minWidth: 274
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: 0
        }
    },
    body: {
        overflow: 'auto',
        marginBottom: theme.spacing(2)
    },
    button: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        color: 'inherit',
        marginLeft: theme.spacing(1)
    },
    alchemicaList: {
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 0,
        margin: 0
    },
    alchemicaToken: {
        position: 'relative',
        flexBasis: '40%',
        maxWidth: '40%',
        textAlign: 'center',
        borderRadius: 5,
        margin: theme.spacing(0, '5%', 2),
        padding: theme.spacing(2, 1),
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #727379',
        boxShadow: `inset 0 0 10px 10px ${theme.palette.background.secondary}, 0 0 10px ${theme.palette.background.secondary}`,
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            height: theme.spacing(2),
            width: 2,
            marginTop: 2,
            marginLeft: -1,
            backgroundColor: '#727379'
        },
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(1)
        }
    },
    disabled: {
        borderColor: theme.palette.error.light
    },
    tokenIcon: {
        display: 'block',
        margin: 'auto',
        width: 40,
        [theme.breakpoints.down('lg')]: {
            width: 30
        },
        '& img': {
            display: 'block',
            width: '100%',
            height: 'auto'
        }
    },
    tokenSum: {
        margin: theme.spacing(1, 0, 0),
        lineHeight: 1,
        [theme.breakpoints.down('lg')]: {
            marginTop: theme.spacing(.5)
        }
    },
    selectedItem: {
        position: 'relative',
        width: 200,
        height: 190,
        borderRadius: 5,
        margin: theme.spacing(3, 'auto', 0),
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #727379',
        boxShadow: `inset 0 0 20px 20px ${theme.palette.background.secondary}, 0 0 10px ${theme.palette.background.secondary}`,
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 136,
            height: theme.spacing(2),
            marginBottom: theme.spacing(2),
            borderRadius: '0 0 5px 5px',
            border: '2px solid #727379',
            borderTopColor: 'transparent',
            [theme.breakpoints.down('lg')]: {
                width: 122
            }
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            height: theme.spacing(2),
            width: 2,
            marginBottom: 2,
            marginLeft: -1,
            backgroundColor: '#727379'
        },
        [theme.breakpoints.down('lg')]: {
            height: 170
        }
    },
    input: {
        width: 200,
        display: 'block',
        margin: theme.spacing(1, 'auto', 0),
        textAlign: 'center',
        '& .MuiOutlinedInput-root': {
            padding: 0
        },
        '& .MuiOutlinedInput-input': {
            textAlign: 'center'
        }
    }
}));

const itemStyles = makeStyles(theme => ({
    craftItem: {
        height: '100%',
        position: 'relative',
        border: '1px solid transparent',
        borderRadius: 5
    },
    selected: {
        borderColor: theme.palette.success.light
    }
}));

const modalStyles = makeStyles(theme => ({
    content: {
        width: 620,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    title: {
        textAlign: 'center'
    },
    alchemica: {
        display: 'flex',
        alignItems: 'center'
    },
    token: {
        margin: theme.spacing(0, 4),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0, 2)
        }
    },
    approved: {
        '& $tokenIcon': {
            opacity: 1
        }
    },
    active: {
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            marginTop: 4,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: theme.palette.primary.main
        }
    },
    tokenIcon: {
        display: 'block',
        width: 40,
        margin: 0,
        opacity: .5,
        '& img': {
            display: 'block',
            width: '100%',
            height: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: 30
        }
    },
    arrow: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        marginTop: -12,
        marginLeft: theme.spacing(2.5)
    },
    button: {
        width: 300,
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        color: 'inherit',
        marginLeft: theme.spacing(1)
    }
}));

export {
    styles as default,
    sidebarStyles,
    itemStyles,
    modalStyles
};
