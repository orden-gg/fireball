import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
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
        },
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
            textShadow: `1px 1px 0 ${alpha('#000', .8)}`
        },
    },
    balanceIcon: {
        marginRight: 4
    },
    balanceValue: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
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
        '& p': {
            opacity: .8
        }
    },
    balancePrice: {
        fontSize: 11,
        fontWeight: 500,
        opacity: .8,
    }
}));

export default styles;
