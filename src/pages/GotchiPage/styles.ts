import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    content: {
        maxWidth: 1200,
        width: '100%',
        padding: theme.spacing(3, 2),
        margin: theme.spacing(8, 'auto'),
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 10px 10px ${theme.palette.background.secondary}`
    },
    button: {
        width: 'auto',
        margin: theme.spacing(0, 1),
        minWidth: 200
    },
    inventory: {
        marginTop: theme.spacing(5)
    },
    listings: {
        textAlign: 'center',
        margin: theme.spacing(4, 'auto', 0)
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center'
    },
    titleText: {
        width: '80%',
        margin: 'auto',
        '& span': {
            color: theme.palette.primary.main
        }
    },
    list: {
        marginTop: theme.spacing(2)
    },
    listingIcon: {
        margin: theme.spacing(-0.25, 0, 0, .5)
    },
    salesHeader: {
        marginTop: theme.spacing(2)
    },
    price: {
        flexBasis: '10%'
    },
    date: {
        flexBasis: '15%'
    },
    address: {
        flexBasis: 200
    },
    wearables: {
        flexBasis: 450
    },
    sets: {
        margin: theme.spacing(7, 0, 4)
    },
    setsList: {
        marginTop: theme.spacing(4)
    }
}));
