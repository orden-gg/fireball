import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        background: alpha('#000', .5),
        padding: 16,
        borderRadius: 4
    },
}));

export default styles;
