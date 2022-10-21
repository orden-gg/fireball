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
    },
    listItem: {
        height: '100%'
    },
    results: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 8,
        fontWeight: 'bold'
    },
    placeholder: {
        marginLeft: 4,
        '& img': {
            display: 'block'
        }
    }
}));
