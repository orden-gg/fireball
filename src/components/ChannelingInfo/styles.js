import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        margin: '8px 0 0',
        padding: '4px 8px',
        background: alpha('#000', .2),
        borderRadius: 4,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 28,
        // height: 28,
        '& img': {
            display: 'block'
        },
        '& p': {
            margin: 0
        }
    },
    unactiveIcon: {
        filter: 'grayscale(1)'
    },
    placeholder: {
        width: 28,
        height: 28,
        borderRadius: 4
    },
}));

export default styles;
