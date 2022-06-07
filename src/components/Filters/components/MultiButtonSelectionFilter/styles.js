import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: -4
    },
    title: {
        lineHeight: 1,
        marginBottom: 8
    },
    items: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    item: {
        marginRight: 4,
        marginBottom: 4,
        padding: '4px 8px',
        textTransform: 'none',
        background: alpha('#fff', .05),
        color: '#fff',
        minWidth: 40,
        '&.selected': {
            background: alpha('#000', .4),
            '&:hover': {
                background: alpha('#000', .3)
            }
        },
        '&:hover': {
            background: alpha('#000', .15)
        }
    }
}));

export default styles;
