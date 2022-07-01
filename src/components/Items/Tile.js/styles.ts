import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    tileImageBox: {
        paddingBottom: '50%',
        position: 'relative',
        marginBottom: theme.spacing(.5)
    },
    tileImage: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '80%',
        maxHeight: '100%'
    }
}));

export const tileStyles = makeStyles(() => createStyles({
    tile: {
        display: 'flex',
        flexDirection: 'column'
    }
}));
