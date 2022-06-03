import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    component: {
        padding: 12,
        '&.no-padding-top': {
            paddingTop: 0
        },
        '&.no-padding-bottom': {
            paddingBottom: 0
        }
    },
    divider: {
        width: '100%',
        borderBottomWidth: 2
    }
}));

export default styles;
