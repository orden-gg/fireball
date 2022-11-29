import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    queuedFakeGotchiImage: {
        width: '100%',
        aspectRatio: '1/1',
        objectFit: 'contain',
        backgroundColor: 'rgb(0, 0, 0)'
    },
    queuedFakeGotchiContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100% - 220px)'
    },
    queuedFakeGotchiName: {
        fontSize: 15,
        color: '#fff'
    },
    queuedFakeGotchiDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#06b6b6',
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        marginTop: 4
    },
    queuedFakeGotchiFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontStyle: 'italic'
    },
    queuedFakeGotchiAuthor: {
        fontWeight: 700,
        color: 'burlywood'
    }
}));
