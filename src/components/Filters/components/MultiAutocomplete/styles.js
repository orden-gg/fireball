import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        marginBottom: 8
    },
    items: {
        marginLeft: 16,
        display: 'flex',
        flexWrap: 'wrap'
    },
    item: {
        margin: '0 0 12px 12px',
        color: 'rgba(104, 134, 255, 0.5)',
        border: '1px solid rgb(7 93 138)',
        textTransform: 'none',
        '&.selected': {
            backgroundColor: 'rgba(7, 93, 138, 1)',
            color: '#fff'
        },
        '&:hover': {
            backgroundColor: '',
            color: '#fff',
            border: '1px solid rgba(67, 127, 248, 1)',
        }
    }
}));

export default styles;
