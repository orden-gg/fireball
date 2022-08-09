import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        marginTop: 18
    },
    inner: {
        '& span': {
            marginLeft: 8
        }
    }
}));
