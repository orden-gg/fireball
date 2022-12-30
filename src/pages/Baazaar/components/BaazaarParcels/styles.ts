
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    sidebar: {
        maxHeight: 'calc(100vh - 177px)',
        overflowY: 'auto'
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
