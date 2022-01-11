import { alpha } from '@mui/system';

import { makeStyles } from "@mui/styles";

import mapSvg from '../../assets/images/svgs/map.svg';
import listSvg from '../../assets/images/svgs/list.svg';

const styles = makeStyles( theme => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    alertWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 192px)'
    },
    alertInner: {
        backgroundColor: theme.palette.secondary.dark,
        maxWidth: 400,
        margin: 'auto',
        padding: 24,
        borderRadius: 4
    },
    alert: {
        marginBottom: 24
    }
}));

const routersStyles = makeStyles( theme => ({
    // backdrop: {
    //     zIndex: theme.zIndex.appBar - 1,
    //     color: '#fff'
    // },
    // textHighlight: {
    //     color: theme.palette.primary.main,
    //     marginLeft: 10
    // },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr',
    },
    listItem: {
        height: '100%'
    },
    lightText: {
        color: theme.palette.primary.main
    },
    loaderBox: {
        textAlign: 'center',
        paddingTop: 32
    },
    sortWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    sortInner: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px'
    },
    sortText: {
        marginRight: 12
    },
    filtersButton: {
        padding: 0,
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    filtersInner: {
        fontSize: 18,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px 12px',
        '& span': {
            width: 18
        }
    },
}));

const clientNavStyles = makeStyles( theme => ({
    container: {
        margin: theme.spacing(1, 0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
        alignSelf: 'center'
    },
    navItem: {
        margin: 4,
        position: 'relative'
    },
    button: {
        paddingRight: 12,
        paddingLeft: 12,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.secondary.dark, .2),
            borderColor: alpha(theme.palette.secondary.light, .2),
            color: alpha('#fff', .3)
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2),
            },
        }
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginLeft: 8,

        '.Mui-disabled &': {
            opacity: .4
        },

        '.active &, .active:hover &': {
            color: theme.palette.secondary.main
        },

        'Mui-disabled.active &, Mui-disabled.active:hover &': {
            color: theme.palette.primary.main
        }
    },
    buttonLoader: {
        width: 28,
        height: 14,
        marginLeft: 8
    },
    
    realmViewSwitch: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: 'hidden',
        opacity: 0,
        transition: '.5s ease-in-out',
        width: 62,
        height: 34,
        padding: 7,
        willChange: 'opacity, transform',

        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url(${mapSvg})`,
                }
            },
        },
        '& .MuiSwitch-thumb': {
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${listSvg})`,
            },
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2
        },
        '& .Mui-checked+.MuiSwitch-track': {
            // opacity: 1,
            backgroundColor: '#fff'
        },

        '.active + &': {
            marginLeft: theme.spacing(2),
            opacity: 1,
            visibility: 'visible'
        }
    }
}));

const loadRewardsStyles = makeStyles( theme => ({
    
    loadWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 16
    },
    loadButton: {
        marginRight: '16px'
    },
    loadReward: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    loadRoundReward: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '16px',
        marginLeft: '4px'
    }
}));

export {
    styles as default,
    clientNavStyles,
    routersStyles,

    loadRewardsStyles
};