import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    section: {
        '& + $section': {
            marginTop: 4
        }
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        padding: '8px 4px 4px'
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerIcon: {
        marginRight: 4
    },
    splits: {
        background: alpha('#000', .2),
        padding: '4px 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& + $splits': {
            marginTop: 2
        },
        '& span': {
            marginRight: 2,
            '&.highlight': {
                color: theme.palette.rarity.legendary,
            }
        }
    },
    tokens: {
        minHeight: 38
    },
    token: {
        margin: '0 2px',
    }
}));

export default styles;
