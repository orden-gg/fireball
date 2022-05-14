import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    icon: {
        fontSize: 14
    },
    button: {
        background: alpha('#000', .2),
        borderRadius: 4,
        padding: 5,
        '&:hover': {
            background: alpha('#000', .4),
        }
    }
}));

export default styles;
