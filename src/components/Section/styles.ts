import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    section: {
        padding: '50px 0',
        [theme.breakpoints.up('md')]: {
            padding: '75px 0'
        }
    }
}));
