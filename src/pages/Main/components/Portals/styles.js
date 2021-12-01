import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    portalsColumn: {
        marginBottom: 30,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        },

        '&.center': {
            justifyContent: 'center'
        }
    },
    portalsDescr: {
        fontSize: 24,
        textAlign: 'center'
    },
    portalsImage: {
        cursor: 'pointer',
        width: 150,
        height: 150
    },
    explorerLink: {
        display: 'inline-block',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: '50%',
            opacity: .3,
            transform: 'translateX(-50%)',
            transition: 'all .3s ease-in-out',
            width: 0,
            height: 1,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main
        },
        '&:hover::after': {
            opacity: 1,
            width: '100%'
        }
    },
    highlight: {
        color: theme.palette.primary.main
    }
}));

export default styles