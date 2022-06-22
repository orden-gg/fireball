import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    userPanel: {
        position: 'fixed',
        right: theme.spacing(2),
        top: theme.spacing(1.5),
        zIndex: theme.zIndex.appBar + 10,
        display: 'flex',
        alignItems: 'center'
    }
}));

export const logoStypes = makeStyles(theme => createStyles({
    logoWrapper: {
        top: theme.spacing(1.5),
        left: theme.spacing(2),
        position: 'fixed',
        zIndex: theme.zIndex.appBar,
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
