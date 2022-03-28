import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    listingsTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0'
    },
    listingsTitleImg: {
        marginRight: '8px',
        width: '32px',
        height: '32px'
    },
    listingsTitle: {
        fontWeight: '500',
        fontSize: '1.25rem',
        lineHeight: '1.75',
        textTransform: 'uppercase'
    }
}));

export default styles;
