import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    content: {
        maxWidth: 1200,
        width: '100%',
        padding: theme.spacing(0, 2),
        margin: theme.spacing(8, 'auto'),
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 10px 10px ${theme.palette.background.secondary}`
    }
}));
