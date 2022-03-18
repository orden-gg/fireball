import { makeStyles } from '@mui/styles';

const styles = makeStyles( theme => ({
    footerWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: '5px 24px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            padding: '5px 32px'
        }
    },
    toolbar: {
        padding: '12px 0',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            flexWrap: 'nowrap'
        }
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 4,
        padding: '4px 8px',
        color: theme.palette.primary.main,
        marginRight: 8
    },
    footerCopyright: {
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    },
    buttons: {
        whiteSpace: 'nowrap',
        margin: '12px auto 0',
        [theme.breakpoints.up('md')]: {
            margin: 0
        }
    }
}));

export default styles;
