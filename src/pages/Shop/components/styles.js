import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    listingsTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0'
    },
    listingsTitle: {
        marginLeft: '8px',
        fontWeight: '500',
        fontSize: '1.25rem',
        lineHeight: '1.75',
        textTransform: 'uppercase'
    }
}));

export default styles;
