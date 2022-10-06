import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    gotchiListings: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    gotchiListingItem: {
        maxHeight: 150,
        maxWidth: 240,
        padding: 6
    },
    section: {
        '& + $section': {
            marginTop: 12
        }
    },
    filtersWrapper: {
        paddingBottom: 12
    },
    buttonsWrapper: {
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between'
    },
    listItem: {
        height: '100%'
    }
}));
