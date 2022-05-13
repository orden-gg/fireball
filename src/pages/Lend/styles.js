import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 12
        }
    }
}));

export default styles;
