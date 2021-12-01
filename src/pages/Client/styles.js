import { alpha } from '@mui/system';

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    container: {
        padding: 24
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
        gridAutoRows: '1fr'
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
        padding: '12px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        margin: 4,
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