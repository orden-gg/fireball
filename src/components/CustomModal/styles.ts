import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px'
    },
    modal: {
        outline: 'none',
        margin: 'auto',
        position: 'relative',
        backgroundColor: theme.palette.background.secondary,
        border: `3px solid ${alpha('#000', .5)}`
    },
    close: {
        cursor: 'pointer',
        position: 'absolute',
        right: 0,
        bottom: '100%'
    }
}));
