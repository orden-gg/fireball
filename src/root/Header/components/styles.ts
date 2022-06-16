import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    balancesWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
        minWidth: 50,
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
        fontSize: 11,
        fontWeight: 500,
        opacity: .8
    }
}));
