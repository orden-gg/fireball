import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {
        maxWidth: 1232,
        margin: '0 auto',
        padding: 12,
        backgroundColor: alpha(theme.palette.secondary.dark, .5),
        borderRadius: 4,
        position: 'relative',
        zIndex: 1,
        width: '100%'
    },
    profileLogged: {
        position: 'relative',
        color: theme.palette.success.main,

        '&.error': {
            color: theme.palette.warning.main
        }
    },
    profileInvalidText: {
        position: 'absolute',
        right: 0,
        bottom: -16,
        whiteSpace: 'nowrap',
        fontSize: 12,
        color: theme.palette.error.main
    }
}));
