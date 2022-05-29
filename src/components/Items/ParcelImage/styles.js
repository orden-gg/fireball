import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    image: {
        position: 'relative',
        background: alpha('#000', .1),
        maxWidth: '100%',
        paddingBottom: '100%',
        '& canvas': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
        },
        '& img': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '60%',
            maxHeight: '60%'
        }
    },
}));

export default styles;
