import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    fakeGotchiCard: {
        maxWidth: 200
    },
    fakeGotchiCardName: {
        color: '#fff'
    }
}));
