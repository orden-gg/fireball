import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
    },
    title: {
        marginRight: 8
    },
    tooltipInner: {
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default styles;
