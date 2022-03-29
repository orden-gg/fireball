import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    priceRoot: {
        '& img': {
            width: 25
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 800,
        '.vertical &': {
            width: '20%'
        },
        '.horizontal &': {
            margin: 'auto'
        }
    }
}));
