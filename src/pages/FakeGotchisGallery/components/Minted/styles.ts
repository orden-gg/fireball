import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    mintedFakeGotchiImage: {
        width: '100%',
        aspectRatio: '1/1',
        objectFit: 'contain',
        backgroundColor: 'rgb(0, 0, 0)'
    },
    mintedFakeGotchiContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100% - 220px)'
    },
    mintedFakeGotchiName: {
        fontSize: 15,
        color: '#fff'
    },
    mintedFakeGotchiDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#06b6b6',
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        marginTop: 4
    },
    mintedFakeGotchiFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontStyle: 'italic'
    },
    mintedFakeGotchiAuthor: {
        fontWeight: 700,
        color: 'burlywood'
    }
}));
