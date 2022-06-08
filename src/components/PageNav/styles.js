import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        margin: 'auto'
    },
    navItem: {
        margin: 4,
        position: 'relative'
    },
    button: {
        paddingRight: 12,
        paddingLeft: 12,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
        '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.secondary.dark, .2),
            borderColor: alpha(theme.palette.secondary.light, .2),
            color: alpha('#fff', .3)
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2)
            }
        }
    },
    navName: {
        marginRight: 8,
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.primary.main,
        '.Mui-disabled &': {
            opacity: .4
        },
        '.active &, .active:hover &': {
            color: theme.palette.secondary.main
        },
        'Mui-disabled.active &, Mui-disabled.active:hover &': {
            color: theme.palette.primary.main
        }
    },
    buttonLoader: {
        width: 28,
        height: 14
    }
}));

export default styles;
