import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    installationImageBox: {
        paddingBottom: '50%',
        position: 'relative',
        marginBottom: theme.spacing(.5)
    },
    installationImage: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '80%',
        maxHeight: '100%'
    }
}));
