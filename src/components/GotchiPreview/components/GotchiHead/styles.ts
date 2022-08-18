import { createStyles, makeStyles } from '@mui/styles';

export const gotchiHeadStyles = makeStyles(theme => createStyles({
    title: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
        borderBottom: `2px solid ${theme.palette.background.paper}`
    },
    name: {
        fontSize: 22,
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main
    }
}));
