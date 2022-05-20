import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        lineHeight: 1,
        marginBottom: 6,
    },
    input: {
        '& label': {
            lineHeight: '1'
        },
        '& input': {
            padding: '7px 12px'
        }
    }
}));

export default styles;
