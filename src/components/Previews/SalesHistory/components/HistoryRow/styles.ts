import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const historyRowStyles = makeStyles(() => createStyles({
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        background: alpha('#000', .15),
        marginTop: 4,
        padding: '8px 0'
    }
}));
