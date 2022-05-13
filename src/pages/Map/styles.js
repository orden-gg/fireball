import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    mapWrapper: {
        position: 'relative',
        height: 'calc(100vh - 140px)'
    },
    citadel: {
        '& .citadel-interface': {
            top: theme.spacing(2)
        }
    }
}));

export {
    styles as default
}
