import { createStyles, makeStyles } from '@mui/styles';

export const gotchiListingsStyles = makeStyles(theme => createStyles({
    listings: {
        textAlign: 'center',
        backgroundColor: theme.palette.background.secondary,
        padding: theme.spacing(2),
        margin: theme.spacing(3, 'auto')
    },
    list: {
        marginTop: theme.spacing(2)
    },
    listing: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        padding: theme.spacing(1, .5),
        backgroundColor: theme.palette.background.default,
        minHeight: 50
    },
    price: {
        flexBasis: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, .5)
    },
    icon: {
        margin: theme.spacing(0, 1)
    },
    time: {
        flexBasis: '25%',
        padding: theme.spacing(0, .5)
    },
    wearables: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexBasis: 536
    },
    wearable: {
        borderRadius: 5,
        border: '1px solid',
        width: 50,
        height: 50,
        padding: theme.spacing(.5),
        margin: theme.spacing(0, .5)
    },
    image: {
        width: '100%',
        paddingBottom: '100%',
        margin: 0
    }
}));
