import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    logoWrapper: {
        top: theme.spacing(1.5),
        left: theme.spacing(2),
        position: 'fixed',
        zIndex: theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        color: theme.palette.text.primary,
        textDecoration: 'none',
        [theme.breakpoints.up('md')]: {
            paddingBottom: 10
        }
    },
    logoDesktop: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    logoMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

export default styles;
