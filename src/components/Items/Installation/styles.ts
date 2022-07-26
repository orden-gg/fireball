import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    installationImageBox: {
        paddingBottom: '50%',
        position: 'relative',
        marginBottom: theme.spacing(.5)
    },
    installationImage: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '100%',
        maxHeight: '100%'
    }
}));
