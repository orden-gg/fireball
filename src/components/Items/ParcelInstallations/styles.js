import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        background: alpha('#000', .2),
        marginTop: 8
    },
    installation: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '4px 8px',
        justifyContent: 'space-between',
        minHeight: 50,
        '& > div': {
            flexBasis: '50%'
        }
    },
    upgrade: {
        flexBasis: '100% !important',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default styles;
