import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    listingsTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0'
    },
    listingsTitleImg: {
        marginRight: '8px',
        width: '24px',
        height: '24px'
    },
    listingsTitle: {
        fontWeight: '500',
        fontSize: '0.875rem',
        lineHeight: '1.75',
        textTransform: 'uppercase'
    },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr',
    },
    listItem: {
        height: '100%'
    },
    loaderBox: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noListings: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default styles;
