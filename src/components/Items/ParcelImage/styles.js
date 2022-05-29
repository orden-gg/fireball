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
            left: 0,
            transition: 'transform .3s ease-in-out'
        },
        '& img': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '50%',
            maxHeight: '50%'
        }
    },
}));

export default styles;
