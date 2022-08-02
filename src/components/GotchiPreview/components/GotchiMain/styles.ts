import { createStyles, makeStyles } from '@mui/styles';

export const gotchiMainStyles = makeStyles(theme => createStyles({
    gotchiMain: {
        backgroundColor: theme.palette.background.secondary,
        padding: theme.spacing(2),
        margin: theme.spacing(3, 'auto')
    },
    container: {
        display: 'flex',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(2)
    },
    gotchiView: {
        flexBasis: '45%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    gotchiCenter: {
        flex: 1,
        margin: '0 2.5% 5%'
    },
    wearables: {
        width: '20%'
    },
    body: {
        marginLeft: theme.spacing(3)
    }
}));
