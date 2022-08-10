import { createStyles, makeStyles } from '@mui/styles';

export const gotchiPreviewModalStyles = makeStyles(theme => createStyles({
    previewModal: {
        width: 1000,
        padding: theme.spacing(1.5)
    },
    traits: {
        maxWidth: 550,
        backgroundColor: theme.palette.background.secondary,
        padding: '2%',
        fontSize: 16,
        '& > div': {
            flexBasis: '48%',
            margin: '1%',
            padding: theme.spacing(.5)
        },
        '& img': {
            width: 24,
            height: 24
        }
    },
    listings: {
        textAlign: 'center',
        margin: theme.spacing(4, 'auto', 0)
    },
    title: {
        fontSize: 20,
        fontWeight: 500
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
    button: {
        width: 'auto',
        margin: theme.spacing(0, 1),
        minWidth: 200
    }
}));
