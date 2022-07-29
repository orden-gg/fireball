import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    stats: {
        color: theme.palette.common.white,
        fontSize: 16,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    stat: {
        margin: '0 2px',
        display: 'flex',
        alignItems: 'center'
    }
}));
