import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {

    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        '& > div': {
            flex: 1
        },
        '&:not(.head)': {
            background: alpha('#000', .15),
            marginTop: 4,
            padding: '8px 0'
        },
        '&.head': {
            color: theme.palette.warning.main
        }
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            marginLeft: 4
        }
    }
}));
