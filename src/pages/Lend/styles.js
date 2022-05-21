import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 12
        }
    },
    filtersWrapper: {
        paddingBottom: 12
    }
}));

export default styles;
