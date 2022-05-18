import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    image: {
        position: 'relative',
        background: alpha('#000', .05),
        border: `2px solid ${alpha('#000', .1)}`,
        '& img': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '75%',
            maxHeight: '75%'
        }
    },
}));

export default styles;
