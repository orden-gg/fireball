import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {
        textAlign: 'center'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        '& p': {
            margin: '0 0 0 8px',
            color: theme.palette.primary.main
        }
    }
}));
