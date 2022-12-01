import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    listingsTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0'
    },
    listingsTitle: {
        marginLeft: '8px',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: '1.75',
        textTransform: 'uppercase'
    }
}));
