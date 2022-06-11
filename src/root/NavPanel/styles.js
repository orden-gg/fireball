import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    container: {
        position: 'fixed',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        zIndex: theme.zIndex.appBar + 10,
        backgroundColor: alpha(theme.palette.background.paper, .8),
        borderRadius: '0 5px 5px 0',
        boxShadow: `0 0 5px 0 ${alpha(theme.palette.common.black, .5)}`
    },
    navigation: {
        width: 40
    },
    navItem: {
        display: 'flex'
    },
    navLink: {
        display: 'block',
        color: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        borderRadius: '0 5px 5px 0',

        '&:hover': {
            backgroundColor: theme.palette.background.default,
            boxShadow: `0 0 5px 0 ${alpha(theme.palette.common.black, .5)}`,

            '& $navItemName': {
                display: 'block'
            }
        }
    },
    iconBox: {
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navItemName: {
        margin: theme.spacing(0, 2, 0, 1),
        whiteSpace: 'nowrap',
        display: 'none'
    }
}));

export default styles;
