import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const styles = makeStyles(theme => createStyles({
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(-1, -1, 0, -1)
    },
    headerBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(-1, -1, 0, -1)
    },
    body: {
        margin: theme.spacing(.25, 0),
        position: 'relative',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(0, -1, -1, 0)
    },
    imageCell: {
        margin: theme.spacing(0, 1),
        maxWidth: 250,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: alpha(theme.palette.common.black, .05)
    },
    statsCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        margin: theme.spacing(2, 1),
        width: 320
    },
    priceCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: theme.spacing(3, 1),
        flex: '1 1 auto'
    }
}));
