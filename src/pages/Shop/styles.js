import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
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
