import { createStyles, makeStyles } from '@mui/styles';

export const gotchiPreviewStyles = makeStyles(theme => createStyles({
    gotchi: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        padding: theme.spacing(2),
        margin: 'auto'
    }
}));
