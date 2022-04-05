
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    balancesWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceLoader: {
        minWidth: 50,
        height: 14,
        padding: '0px 6px'
    },
    balance: {
        minWidth: 50,
        textAlign: 'center',
        padding: '2px 6px',
        cursor: 'default',
        '& + $balance': {
            marginLeft: 6
        },
        '& p': {
            margin: 0,
            lineHeight: 1.2,
            textShadow: '2px 2px 0 black'
        },
    },
    balanceIcon: {
        marginRight: 4
    },
    balanceValue: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
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
