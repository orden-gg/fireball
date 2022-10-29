import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    size: {
        margin: 'auto 0',
        color: theme.palette.common.white,
        opacity: .5,
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 600,
        padding: theme.spacing(.25, .75)
    }
}));
