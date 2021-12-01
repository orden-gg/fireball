import { makeStyles } from "@mui/styles";

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
        padding: 0
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
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    }
}));

export default styles;