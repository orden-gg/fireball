import { createStyles, makeStyles } from '@mui/styles';

export const gotchiPreviewModalStyles = makeStyles(theme => createStyles({
    previewModal: {
        width: 1000,
        padding: theme.spacing(1.5)
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
    }
}));
