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
    salesHeader: {
        marginTop: theme.spacing(2)
    },
    wearables: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexBasis: 400
    },
    wearable: {
        borderRadius: 5,
        border: '1px solid',
        width: 40,
        height: 40,
        padding: theme.spacing(.5),
        margin: theme.spacing(0, .5)
    },
    image: {
        width: '100%',
        paddingBottom: '100%',
        margin: 0
    }
}));
