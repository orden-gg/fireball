import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    mapWrapper: {
        position: 'relative',
        height: 'calc(100vh - 74px)'
    },
    citadel: {
        '& .citadel-interface': {
            top: theme.spacing(8)
        }
    }
}));

export default styles;
