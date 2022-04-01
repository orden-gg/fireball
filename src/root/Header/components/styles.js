
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    balancesWrapper: {
        width: '75%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balance: {
        width: '60px',
        marginRight: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    balanceValue: {
        fontSize: '12px'
    }
}));

export default styles;
