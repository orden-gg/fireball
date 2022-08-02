import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const historyHeadStyles = makeStyles(theme => createStyles({
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        color: theme.palette.warning.main
    }
}));
