import { createStyles, makeStyles } from '@mui/styles';
import bg from 'assets/images/main-background/background.png';
import flower2 from 'assets/images/main-background/flower2.png';
import midgroundFar from 'assets/images/main-background/midground-far.png';
import flower1 from 'assets/images/main-background/flower1.png';
import smokeMid from 'assets/images/main-background/smoke-mid.png';
import midgroundClose from 'assets/images/main-background/midground-close.png';
import smokeClose from 'assets/images/main-background/smoke-close.png';
import foreground from 'assets/images/main-background/foreground.png';

export const styles = makeStyles(theme => createStyles({
    homeBg: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: '50%',
        bottom: 0,
        transform: 'translateX(-50%)',
        background: `url(${bg}) center`,
        backgroundSize: 'cover'
    },
    bgPart: {
        position: 'absolute',
        width: '100%',
        bottom: '0',
        paddingBottom: '56%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            height: '100%',
            padding: 0
        }
    },
    flower2: {
        backgroundImage: `url(${flower2})`,
        animation: '100s $flower infinite',
        transformOrigin: '23% 68%',
        [theme.breakpoints.down('md')]: {
            animation: 'none'
        }
    },
    midgroundFar: {
        backgroundImage: `url(${midgroundFar})`
    },
    flower1: {
        backgroundImage: `url(${flower1})`,
        animation: '100s $flower 1s infinite',
        transformOrigin: '85% 68%',
        [theme.breakpoints.down('md')]: {
            animation: 'none'
        }
    },
    smokeMid: {
        backgroundImage: `url(${smokeMid})`
    },
    midgroundClose: {
        backgroundImage: `url(${midgroundClose})`
    },
    smokeClose: {
        backgroundImage: `url(${smokeClose})`
    },
    foreground: {
        backgroundImage: `url(${foreground})`
    },
    content: {
        minHeight: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
    },
    button: {
        width: 240,
        margin: theme.spacing(0, 'auto', 2),
        display: 'block'
    },
    modal: {
        maxWidth: 1000,
        padding: theme.spacing(3, 0)
    },
    container: {
        maxHeight: 400,
        overflow: 'auto',
        padding: theme.spacing(0, 2)
    },
    title: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontWeight: 700,
        marginBottom: theme.spacing(2)
    },
    text: {
        margin: theme.spacing(2, 0),
        lineHeight: 1.6,
        textAlign: 'center',
        padding: theme.spacing(0, 2)
    },
    subText: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(0, 2)
    },
    list: {
        backgroundColor: theme.palette.background.default,
        listStyle: 'none',
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0)
    },
    listItem: {
        margin: theme.spacing(1, 0),
        position: 'relative',
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        lineHeight: 1.8,

        '&:before': {
            content: '""',
            position: 'absolute',
            left: 3,
            top: 9,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main
        }
    },
    link: {
        color: theme.palette.primary.main,

        '&:hover': {
            textDecoration: 'none'
        }
    },
    '@keyframes flower': {
        '0%, 22%, 49%, 62%, 81%, 100%': {
            transform: 'rotate(0)'
        },
        '14%, 32%, 56%, 70%, 89%': {
            transform: 'rotate(4deg) skew(-4deg, 4deg)'
        }
    }
}));
