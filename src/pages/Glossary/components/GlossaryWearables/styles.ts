import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    glossaryWearablesContainer: {
        padding: '56px 16px 12px'
    },
    backButton: {
        marginLeft: 12
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
    }
}));
