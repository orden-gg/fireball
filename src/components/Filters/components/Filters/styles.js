import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    component: {
        padding: 12,
        '&.no-padding': {
            paddingBottom: 0
        }
    },
    divider: {
        width: '100%',
        borderBottomWidth: 2
    }
}));

export default styles;
