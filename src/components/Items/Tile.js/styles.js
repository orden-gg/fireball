import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    tile: {
        textAlign: 'center',
        padding: theme.spacing(4, 1.5, 4.5),
        backgroundColor: alpha(theme.palette.rarity.legendary, .1),
        borderRadius: theme.spacing(1),
        position: 'relative'
    },
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
    },
    tileBalance: {
        border: '3px solid transparent',
        display: 'flex',
        padding: '0 4px',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        position: 'absolute',
        minWidth: 34,
        backgroundColor: 'rgba(33, 36, 41, 0.8)'
    }
}));
