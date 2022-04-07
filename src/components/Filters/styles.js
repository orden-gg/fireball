
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 12
        }
    }
}));

const GotchiSortingStyles = makeStyles(theme => ({
    container: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        background: alpha('#000', .2),
        borderRadius: '4px 4px 0 0',
        height: 40
    },
    inner: {
        display: 'flex',
        alignItems: 'center'
    },
    results: {
        paddingRight: 8,
        fontWeight: 'bold'
    }
}));

export {
    styles as default,
    GotchiSortingStyles
}
