import { createStyles, makeStyles } from '@mui/styles';

export const gotchiEquipmentPriceStyles = makeStyles(theme => createStyles({
    totalPrice: {
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginLeft: theme.spacing(.5)
    }
}));
