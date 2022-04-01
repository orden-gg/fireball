import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    gotchiCollateral: {
        width: 20,
        height: 23,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        margin: '0 2px',
        '& img': {
            display: 'block',
            maxHeight: '100%',
            maxWidth: '100%'
        },
        '.vertical &': {
        }
    }
}));

export default styles;
