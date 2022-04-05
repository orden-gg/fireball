
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    balancesWrapper: {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balance: {
        width: '75px',
        display: 'flex',
        alignItems: 'center'
    },
    balanceValueWrapper: {
        marginLeft: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    balanceValue: {
        fontSize: '12px'
    }
}));

export default styles;
