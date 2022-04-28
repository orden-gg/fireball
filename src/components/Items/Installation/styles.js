import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    installation: {
        textAlign: 'center',
        padding: theme.spacing(1),
        backgroundColor: alpha(theme.palette.rarity.legendary, .1),
        borderRadius: theme.spacing(1)
    },
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
