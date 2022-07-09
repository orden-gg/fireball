import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    leftSide: {
        position: 'fixed',
        top: theme.spacing(1.5),
        left: theme.spacing(2),
        zIndex: theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'center'
    },
    userPanel: {
        position: 'fixed',
        right: theme.spacing(2),
        top: theme.spacing(1.5),
        zIndex: theme.zIndex.appBar + 10,
        display: 'flex',
        alignItems: 'center'
    }
}));

export const dataReloadStyles = makeStyles(theme => createStyles({
    dataReloadWrapper: {
        position: 'relative',
        marginLeft: theme.spacing(2)
    },
    topButtonsGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: alpha(theme.palette.background.secondary, .8),
        overflow: 'hidden',
        '&.opened': {
            borderRadius: '8px 8px 0 0',
            borderBottomColor: 'transparent'
        }
    },
    divider: {
        height: 20,
        margin: -1
    },
    mainButton: {
        padding: theme.spacing(.4, 1),
        borderRadius: 0,
        minWidth: 'auto',
        color: theme.palette.text.primary,
        border: '1px solid transparent',
        transition: 'none',
        borderBottom: 'none',
        '&.opened, &:hover': {
            backgroundColor: theme.palette.background.paper

        },
        '&.opened': {
            borderRadius: '8px 8px 0 0',
            borderColor: alpha(theme.palette.text.primary, .1),
            posotion: 'relative',
            zIndex: 1
        },
        '&.active': {
            color: theme.palette.primary.main
        },
        '&.is-loading svg': {
            animation: '1s $rotate ease-in-out infinite'
        },
        '& .MuiSvgIcon-root': {
            width: 22,
            height: 22
        }
    },
    liveReloadDropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: -1,
        minWidth: 100,
        background: theme.palette.background.paper,
        borderRadius: '4px',
        cursor: 'default',
        overflow: 'hidden',
        padding: theme.spacing(1.5),
        border: `1px solid ${alpha(theme.palette.text.primary, .1)}`,
        '.opened &': {
            display: 'block'
        }
    },
    dropdownTitle: {
        margin: theme.spacing(0, 0, .2, .5),
        fontSize: 12
    },
    selectContainer: {
        width: '100%',
        '& .MuiSelect-root': {
            width: '100%'
        }
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.spacing(1.5, -.5, 0)
    },
    dropdownButton: {
        margin: theme.spacing(0, .5)
    },
    tooltip: {
        textAlign: 'center'
    },
    tooltipTitle: {
        marginBottom: theme.spacing(.2),
        display: 'block'
    },
    tooltipRow: {
        display: 'flex'
    },
    countdown: {
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main
    },
    interval: {
        position: 'absolute',
        top: theme.spacing(1),
        left: '100%',
        marginLeft: theme.spacing(1),
        whiteSpace: 'nowrap',
        backgroundColor: alpha(theme.palette.background.secondary, .8),
        boxShadow: `0 0 3px 3px ${alpha(theme.palette.background.secondary, .8)}`,
        lineHeight: 1.1,
        padding: '0 4px',
        borderRadius: 5
    },
    '@keyframes rotate':  {
        '100%': {
            transform: 'rotate(360deg)'
        }
    }
}));

export const logoStyles = makeStyles(theme => createStyles({
    logoWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        color: theme.palette.text.primary,
        textDecoration: 'none',
        [theme.breakpoints.up('md')]: {
            paddingBottom: 10
        }
    },
    logoDesktop: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    logoMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

export const balancesStyles = makeStyles(theme => createStyles({
    balancesWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    balancesButton: {
        margin: theme.spacing(0, 1)
    },
    balancesList: {
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: alpha('#212121cc', .9),
        boxShadow: '0 0 3px 3px #212121cc'
    },
    balanceLoader: {
        width: 50,
        height: 20,
        borderRadius: 4,
        overflow: 'hidden',
        '& + $balanceLoader': {
            marginLeft: 6
        }
    },
    balance: {
        textAlign: 'center',
        padding: '2px 6px',
        '& + $balance': {
            marginLeft: 6
        },
        '& p': {
            margin: 0,
            lineHeight: 1.2,
            textShadow: `1px 1px 0 ${alpha('#000', .7)}`
        }
    },
    balanceValue: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        '& img': {
            marginRight: 4
        },
        '&.fud': {
            color: theme.palette.alchemica.fud
        },
        '&.fomo': {
            color: theme.palette.alchemica.fomo
        },
        '&.alpha': {
            color: theme.palette.alchemica.alpha
        },
        '&.kek': {
            color: theme.palette.alchemica.kek
        },
        '&.gltr': {
            color: theme.palette.alchemica.gltr
        },
        '& p': {
            opacity: .8
        }
    },
    balancePrice: {
        fontWeight: 500,
        textAlign: 'center'
    }
}));
