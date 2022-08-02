import { createStyles, makeStyles } from '@mui/styles';

export const gotchiPreviewStyles = makeStyles(theme => createStyles({
    title: {
        backgroundColor: theme.palette.background.default
    },
    titleText: {
        width: '80%',
        margin: 'auto',
        '& span': {
            color: theme.palette.primary.main
        }
    },
}));
