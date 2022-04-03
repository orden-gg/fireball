
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    balancesWrapper: {
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
