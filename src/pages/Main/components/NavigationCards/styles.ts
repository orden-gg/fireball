import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        navContainer: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${(16 / 1920) * 100}vw`,
            padding: '55px 10px',
            background: '#282537',
            backgroundImage: 'radial-gradient(top, circle cover, #3c3b52 0%, #252233 80%)',
            [theme.breakpoints.down('lg')]: {
                fontSize: `${(22 / 1920) * 100}vw`
            },
            [theme.breakpoints.down('md')]: {
                fontSize: `${(28 / 1920) * 100}vw`
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: `${(40 / 1920) * 100}vw`
            }
        },
        navInner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        navCard: {
            margin: '0.5em',
            borderRadius: 4,
            overflow: 'hidden',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
            width: '15em',
            position: 'relative',
            '& img': {
                display: 'block',
                width: '100%',
                transition: 'transform .3s ease-in-out'
            },
            '&:hover img': {
                transform: 'scale(1.03)'
            },
            '&:hover $navCardDescr': {
                transform: 'none'
            }
        },
        navCardName: {
            fontFamily: 'Amatic SC, cursive',
            fontSize: '2em',
            fontWeight: 700,
            color: 'snow',
            lineHeight: 1,
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            padding: 4,
            textShadow: `0 0 2px ${alpha('#000', 0.5)},
                        0 0 2px ${alpha('#000', 0.5)},
                        0 0 2px ${alpha('#000', 0.5)}`
        },
        navCardImage: {
            position: 'relative',
            overflow: 'hidden'
        },
        navCardDescr: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha('#000', 0.75),
            transform: 'translateY(100%)',
            transition: 'all .2s ease-in-out'
        }
    })
);
