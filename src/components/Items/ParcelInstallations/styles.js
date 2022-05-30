import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        background: alpha('#000', .2),
        borderTop: `2px solid ${alpha('#000', .2)}`,
        borderBottom: `2px solid ${alpha('#000', .2)}`
    },
    installation: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '4px 8px',
        justifyContent: 'space-between',
        minHeight: 88,
    },
    upgrade: {
        flexBasis: '100% !important',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default styles;
