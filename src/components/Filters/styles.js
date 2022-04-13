import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 12
        }
    }
}));

const LazySortingStyles = makeStyles(theme => ({
    inner: {
        display: 'flex',
        alignItems: 'center'
    },
}));

export {
    styles as default,
    LazySortingStyles
}
