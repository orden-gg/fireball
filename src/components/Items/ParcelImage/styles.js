import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    image: {
        position: 'relative',
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
